import { NOT_FOUND } from "../constants";
import { Person } from "../entity/Person";
import { Product } from "../entity/Product";
import { findPerson } from "./Person";
import { findProducts } from "./products";
import { Followes } from "../entity/Followes";

export const findFollowes = async (
  followesId?: number,
  withRelations = false
): Promise<any[]> => {
  const x = await Followes.find({
    ...(followesId ? { where: { personId: followesId } } : {}),
    ...(withRelations
      ? {
          relations: {
            Person:false,
            Products: true,
          },
        }
      : {}),
  });
  console.log("x");
  return x;
};

export const createFollowe = async (
  record: Followes,
  productIds: number[]
): Promise<Followes> => {
  const followes = Followes.create(record);
  const promises: Promise<Product[]>[] = [];
  console.log("promises");
  console.log(promises);
  for (const productId of productIds) {
    console.log("productId");
    console.log(productId);
    promises.push(findProducts(productId));
  }

  const product = await Promise.all(promises);
  followes.Products = product.flat();
  return await followes.save();
};



export const deleteFollowe = async (productId: number): Promise<boolean> => {
  const res = await Followes.delete(productId)
  return res.affected ? true : false
}


export const updateFollowe = async (orderId: number, data:any): Promise<Followes | typeof NOT_FOUND > => {
  const { products: productIds, customer: customerId, ...orderProps} = data
  const [order] = await findFollowes(orderId)

  if(!order){
      return NOT_FOUND
  }

  if(data.customer){
      const [customer] = await findPerson(customerId)

      if(!customer){
          return NOT_FOUND
      }

      order.customer = customer
  }

  if(data.products && data.products.length){
      const promises: Promise<Product[]>[] = []
      for (const productId of productIds) {
        promises.push(findProducts(productId))
      }
    
      const products = await Promise.all(promises)
  
      if(!products.length){
          return NOT_FOUND
      }
      order.products = products.flat()
  }

  for(const key in orderProps){
      order[key] = orderProps[key]
  }

  return await order.save()
}
