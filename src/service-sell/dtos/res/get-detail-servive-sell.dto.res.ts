import { CategoryServiceSells } from '../../entities/category-service-sells.entity';
import { ServiceSells } from '../../entities/service-sell.entity';

export interface GetDetailServiceSellResDtoParams {
  data: ServiceSells;
}
export class GetDetailServiceSellResDto {
  created_at?: Date;
  updated_at?: Date;
  id: number;
  name?: string;
  name_str_filter?: string;
  images: Array<string>;
  price?: number;
  sold?: number;
  status?: number;
  seller_service_name?: string;
  phone_number_seller_service?: string;
  service_sell_icon?: string;
  description?: string;
  category_service_sell_id?: number;
  category_service_sell?: CategoryServiceSells;

  static fromUser({ data }: GetDetailServiceSellResDtoParams) {
    const result = new GetDetailServiceSellResDto();
    result.id = data.id;
    result.name = data.name;
    result.created_at = data.created_at;
    result.updated_at = data.updated_at;
    result.name_str_filter = data.name_str_filter;
    try {
      result.images = JSON.parse(data.images);
    } catch (error) {
      result.images = [];
    }
    result.price = data.price;
    result.sold = data.sold;
    result.status = data.status;
    result.seller_service_name = data.seller_service_name;
    result.phone_number_seller_service = data.phone_number_seller_service;
    result.service_sell_icon = data.service_sell_icon;
    result.description = data.description;
    result.category_service_sell_id = data.category_service_sell_id;
    result.category_service_sell = data.category_service_sell;

    return result;
  }
}
