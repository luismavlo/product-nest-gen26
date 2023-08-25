import { Injectable, HttpException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new HttpException('Product not found', 404);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const productLoaded = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });
    try {
      await this.productRepository.save(productLoaded);

      return productLoaded;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  private handleDBException(error: any) {
    if (error.code === '23505')
      throw new HttpException('Product already exists', 400);

    this.logger.error(error);
    throw new HttpException('Something went wrong', 500);
  }
}
