import CartModel from "../models/Cart.js";


export const createCart = async (req, res) => {
    try {
        const { price, ProductId, VariantId, UserId } = req.body;
        const payload = { price, user_id: UserId };
        if (ProductId) {
            payload.product_id = ProductId
        }
        if (VariantId) {
            payload.variant_id = VariantId;
        }
        const newcar = new CartModel(payload);
        const varData = await newcar.save();
        if (varData)
            return res.status(201).send({ message: "Item added into cart successfully" });
        else
            return res.status(400).send({ message: "unable to add item into cart" });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ error: e?.message });
    }
};
export const getAllCartinfoByUserId = async(req,res)=>{
    try {
      const Cartinfo = await CartModel.find({
        userId:req.params.userId,
      }).populate("category");
      res.status(200).send({Cartinfo});
    } 
    catch (e) {
      res.status(404).send({error:e?.message});
    }
  };
