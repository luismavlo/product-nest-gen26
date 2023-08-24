import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // const product = new Product();
      // product.title = createProductDto.title;
      // product.description = createProductDto.description;

      // const productCreated = this.productRepository.create(product);
      // await this.productRepository.save(productCreated);

      return 'hello';
    } catch (error) {
      console.log(error);
      // throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
