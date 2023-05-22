export class CreateAddressDto {
  country: string;
  city: string;
  zip: number;
  street: string;
  house: string;
  apartment?: string;
}
