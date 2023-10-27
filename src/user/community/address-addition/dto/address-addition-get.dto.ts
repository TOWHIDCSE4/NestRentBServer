export class AddressAdditionGetQueryDto {
  limit?: number = 20;
  sort_by?: string = 'created_at';
  province?: number;
  district?: number;
  wards?: number;
  descending?: boolean = false;
  user_id: number;
}
