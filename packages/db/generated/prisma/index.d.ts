
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductVariant
 * 
 */
export type ProductVariant = $Result.DefaultSelection<Prisma.$ProductVariantPayload>
/**
 * Model ProductAttribute
 * 
 */
export type ProductAttribute = $Result.DefaultSelection<Prisma.$ProductAttributePayload>
/**
 * Model Attribute
 * 
 */
export type Attribute = $Result.DefaultSelection<Prisma.$AttributePayload>
/**
 * Model AttributeValue
 * 
 */
export type AttributeValue = $Result.DefaultSelection<Prisma.$AttributeValuePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariants
    * const productVariants = await prisma.productVariant.findMany()
    * ```
    */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productAttribute`: Exposes CRUD operations for the **ProductAttribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductAttributes
    * const productAttributes = await prisma.productAttribute.findMany()
    * ```
    */
  get productAttribute(): Prisma.ProductAttributeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attribute`: Exposes CRUD operations for the **Attribute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attributes
    * const attributes = await prisma.attribute.findMany()
    * ```
    */
  get attribute(): Prisma.AttributeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attributeValue`: Exposes CRUD operations for the **AttributeValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttributeValues
    * const attributeValues = await prisma.attributeValue.findMany()
    * ```
    */
  get attributeValue(): Prisma.AttributeValueDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Category: 'Category',
    Product: 'Product',
    ProductVariant: 'ProductVariant',
    ProductAttribute: 'ProductAttribute',
    Attribute: 'Attribute',
    AttributeValue: 'AttributeValue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "category" | "product" | "productVariant" | "productAttribute" | "attribute" | "attributeValue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>
        fields: Prisma.ProductVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariant>
          }
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantCountAggregateOutputType> | number
          }
        }
      }
      ProductAttribute: {
        payload: Prisma.$ProductAttributePayload<ExtArgs>
        fields: Prisma.ProductAttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductAttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductAttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          findFirst: {
            args: Prisma.ProductAttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductAttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          findMany: {
            args: Prisma.ProductAttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>[]
          }
          create: {
            args: Prisma.ProductAttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          createMany: {
            args: Prisma.ProductAttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductAttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>[]
          }
          delete: {
            args: Prisma.ProductAttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          update: {
            args: Prisma.ProductAttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          deleteMany: {
            args: Prisma.ProductAttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductAttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductAttributeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>[]
          }
          upsert: {
            args: Prisma.ProductAttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductAttributePayload>
          }
          aggregate: {
            args: Prisma.ProductAttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductAttribute>
          }
          groupBy: {
            args: Prisma.ProductAttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductAttributeCountArgs<ExtArgs>
            result: $Utils.Optional<ProductAttributeCountAggregateOutputType> | number
          }
        }
      }
      Attribute: {
        payload: Prisma.$AttributePayload<ExtArgs>
        fields: Prisma.AttributeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttributeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttributeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          findFirst: {
            args: Prisma.AttributeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttributeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          findMany: {
            args: Prisma.AttributeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          create: {
            args: Prisma.AttributeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          createMany: {
            args: Prisma.AttributeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttributeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          delete: {
            args: Prisma.AttributeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          update: {
            args: Prisma.AttributeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          deleteMany: {
            args: Prisma.AttributeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttributeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttributeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>[]
          }
          upsert: {
            args: Prisma.AttributeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributePayload>
          }
          aggregate: {
            args: Prisma.AttributeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttribute>
          }
          groupBy: {
            args: Prisma.AttributeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttributeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttributeCountArgs<ExtArgs>
            result: $Utils.Optional<AttributeCountAggregateOutputType> | number
          }
        }
      }
      AttributeValue: {
        payload: Prisma.$AttributeValuePayload<ExtArgs>
        fields: Prisma.AttributeValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttributeValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttributeValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          findFirst: {
            args: Prisma.AttributeValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttributeValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          findMany: {
            args: Prisma.AttributeValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>[]
          }
          create: {
            args: Prisma.AttributeValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          createMany: {
            args: Prisma.AttributeValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttributeValueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>[]
          }
          delete: {
            args: Prisma.AttributeValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          update: {
            args: Prisma.AttributeValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          deleteMany: {
            args: Prisma.AttributeValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttributeValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttributeValueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>[]
          }
          upsert: {
            args: Prisma.AttributeValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttributeValuePayload>
          }
          aggregate: {
            args: Prisma.AttributeValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttributeValue>
          }
          groupBy: {
            args: Prisma.AttributeValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttributeValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttributeValueCountArgs<ExtArgs>
            result: $Utils.Optional<AttributeValueCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    category?: CategoryOmit
    product?: ProductOmit
    productVariant?: ProductVariantOmit
    productAttribute?: ProductAttributeOmit
    attribute?: AttributeOmit
    attributeValue?: AttributeValueOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    variants: number
    attributes: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs
    attributes?: boolean | ProductCountOutputTypeCountAttributesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
  }


  /**
   * Count Type ProductVariantCountOutputType
   */

  export type ProductVariantCountOutputType = {
    attribute_values: number
  }

  export type ProductVariantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attribute_values?: boolean | ProductVariantCountOutputTypeCountAttribute_valuesArgs
  }

  // Custom InputTypes
  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariantCountOutputType
     */
    select?: ProductVariantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductVariantCountOutputType without action
   */
  export type ProductVariantCountOutputTypeCountAttribute_valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeValueWhereInput
  }


  /**
   * Count Type ProductAttributeCountOutputType
   */

  export type ProductAttributeCountOutputType = {
    values: number
  }

  export type ProductAttributeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | ProductAttributeCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * ProductAttributeCountOutputType without action
   */
  export type ProductAttributeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttributeCountOutputType
     */
    select?: ProductAttributeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductAttributeCountOutputType without action
   */
  export type ProductAttributeCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeValueWhereInput
  }


  /**
   * Count Type AttributeCountOutputType
   */

  export type AttributeCountOutputType = {
    values: number
    products: number
  }

  export type AttributeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | AttributeCountOutputTypeCountValuesArgs
    products?: boolean | AttributeCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeCountOutputType
     */
    select?: AttributeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeValueWhereInput
  }

  /**
   * AttributeCountOutputType without action
   */
  export type AttributeCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
  }


  /**
   * Count Type AttributeValueCountOutputType
   */

  export type AttributeValueCountOutputType = {
    variants: number
    productAttributes: number
  }

  export type AttributeValueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | AttributeValueCountOutputTypeCountVariantsArgs
    productAttributes?: boolean | AttributeValueCountOutputTypeCountProductAttributesArgs
  }

  // Custom InputTypes
  /**
   * AttributeValueCountOutputType without action
   */
  export type AttributeValueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValueCountOutputType
     */
    select?: AttributeValueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttributeValueCountOutputType without action
   */
  export type AttributeValueCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }

  /**
   * AttributeValueCountOutputType without action
   */
  export type AttributeValueCountOutputTypeCountProductAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    parent_id: string | null
    image_url: string | null
    description: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    parent_id: string | null
    image_url: string | null
    description: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    name: number
    parent_id: number
    image_url: number
    description: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    parent_id?: true
    image_url?: true
    description?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    parent_id?: true
    image_url?: true
    description?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    parent_id?: true
    image_url?: true
    description?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    parent_id: string | null
    image_url: string | null
    description: string | null
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    parent_id?: boolean
    image_url?: boolean
    description?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    parent_id?: boolean
    image_url?: boolean
    description?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    parent_id?: boolean
    image_url?: boolean
    description?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    parent_id?: boolean
    image_url?: boolean
    description?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "name" | "parent_id" | "image_url" | "description", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      name: string
      parent_id: string | null
      image_url: string | null
      description: string | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly created_at: FieldRef<"Category", 'DateTime'>
    readonly updated_at: FieldRef<"Category", 'DateTime'>
    readonly name: FieldRef<"Category", 'String'>
    readonly parent_id: FieldRef<"Category", 'String'>
    readonly image_url: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    description: string | null
    category_id: string | null
    thumbnail_image_url: string | null
    brand_id: string | null
    meta_title: string | null
    meta_description: string | null
    slug: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    description: string | null
    category_id: string | null
    thumbnail_image_url: string | null
    brand_id: string | null
    meta_title: string | null
    meta_description: string | null
    slug: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    name: number
    description: number
    category_id: number
    thumbnail_image_url: number
    images_url: number
    brand_id: number
    meta_title: number
    meta_description: number
    slug: number
    related_products: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    description?: true
    category_id?: true
    thumbnail_image_url?: true
    brand_id?: true
    meta_title?: true
    meta_description?: true
    slug?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    description?: true
    category_id?: true
    thumbnail_image_url?: true
    brand_id?: true
    meta_title?: true
    meta_description?: true
    slug?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    description?: true
    category_id?: true
    thumbnail_image_url?: true
    images_url?: true
    brand_id?: true
    meta_title?: true
    meta_description?: true
    slug?: true
    related_products?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    description: string
    category_id: string
    thumbnail_image_url: string
    images_url: string[]
    brand_id: string | null
    meta_title: string | null
    meta_description: string | null
    slug: string | null
    related_products: string[]
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    description?: boolean
    category_id?: boolean
    thumbnail_image_url?: boolean
    images_url?: boolean
    brand_id?: boolean
    meta_title?: boolean
    meta_description?: boolean
    slug?: boolean
    related_products?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    description?: boolean
    category_id?: boolean
    thumbnail_image_url?: boolean
    images_url?: boolean
    brand_id?: boolean
    meta_title?: boolean
    meta_description?: boolean
    slug?: boolean
    related_products?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    description?: boolean
    category_id?: boolean
    thumbnail_image_url?: boolean
    images_url?: boolean
    brand_id?: boolean
    meta_title?: boolean
    meta_description?: boolean
    slug?: boolean
    related_products?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    description?: boolean
    category_id?: boolean
    thumbnail_image_url?: boolean
    images_url?: boolean
    brand_id?: boolean
    meta_title?: boolean
    meta_description?: boolean
    slug?: boolean
    related_products?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "name" | "description" | "category_id" | "thumbnail_image_url" | "images_url" | "brand_id" | "meta_title" | "meta_description" | "slug" | "related_products", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    variants?: boolean | Product$variantsArgs<ExtArgs>
    attributes?: boolean | Product$attributesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
      attributes: Prisma.$ProductAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      name: string
      description: string
      category_id: string
      thumbnail_image_url: string
      images_url: string[]
      brand_id: string | null
      meta_title: string | null
      meta_description: string | null
      slug: string | null
      related_products: string[]
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variants<T extends Product$variantsArgs<ExtArgs> = {}>(args?: Subset<T, Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attributes<T extends Product$attributesArgs<ExtArgs> = {}>(args?: Subset<T, Product$attributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly created_at: FieldRef<"Product", 'DateTime'>
    readonly updated_at: FieldRef<"Product", 'DateTime'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly category_id: FieldRef<"Product", 'String'>
    readonly thumbnail_image_url: FieldRef<"Product", 'String'>
    readonly images_url: FieldRef<"Product", 'String[]'>
    readonly brand_id: FieldRef<"Product", 'String'>
    readonly meta_title: FieldRef<"Product", 'String'>
    readonly meta_description: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly related_products: FieldRef<"Product", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.variants
   */
  export type Product$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * Product.attributes
   */
  export type Product$attributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    cursor?: ProductAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  export type ProductVariantAvgAggregateOutputType = {
    price: Decimal | null
    sale_price: Decimal | null
    stock: number | null
  }

  export type ProductVariantSumAggregateOutputType = {
    price: Decimal | null
    sale_price: Decimal | null
    stock: number | null
  }

  export type ProductVariantMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    product_id: string | null
    sku: string | null
    price: Decimal | null
    sale_price: Decimal | null
    stock: number | null
    image_url: string | null
    barcode: string | null
  }

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    product_id: string | null
    sku: string | null
    price: Decimal | null
    sale_price: Decimal | null
    stock: number | null
    image_url: string | null
    barcode: string | null
  }

  export type ProductVariantCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    product_id: number
    sku: number
    price: number
    sale_price: number
    stock: number
    size: number
    image_url: number
    barcode: number
    _all: number
  }


  export type ProductVariantAvgAggregateInputType = {
    price?: true
    sale_price?: true
    stock?: true
  }

  export type ProductVariantSumAggregateInputType = {
    price?: true
    sale_price?: true
    stock?: true
  }

  export type ProductVariantMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    sku?: true
    price?: true
    sale_price?: true
    stock?: true
    image_url?: true
    barcode?: true
  }

  export type ProductVariantMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    sku?: true
    price?: true
    sale_price?: true
    stock?: true
    image_url?: true
    barcode?: true
  }

  export type ProductVariantCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    sku?: true
    price?: true
    sale_price?: true
    stock?: true
    size?: true
    image_url?: true
    barcode?: true
    _all?: true
  }

  export type ProductVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariants
    **/
    _count?: true | ProductVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductVariantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductVariantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariantMaxAggregateInputType
  }

  export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>
  }




  export type ProductVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithAggregationInput | ProductVariantOrderByWithAggregationInput[]
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum
    having?: ProductVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariantCountAggregateInputType | true
    _avg?: ProductVariantAvgAggregateInputType
    _sum?: ProductVariantSumAggregateInputType
    _min?: ProductVariantMinAggregateInputType
    _max?: ProductVariantMaxAggregateInputType
  }

  export type ProductVariantGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    product_id: string
    sku: string
    price: Decimal
    sale_price: Decimal | null
    stock: number
    size: JsonValue
    image_url: string | null
    barcode: string | null
    _count: ProductVariantCountAggregateOutputType | null
    _avg: ProductVariantAvgAggregateOutputType | null
    _sum: ProductVariantSumAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    sku?: boolean
    price?: boolean
    sale_price?: boolean
    stock?: boolean
    size?: boolean
    image_url?: boolean
    barcode?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute_values?: boolean | ProductVariant$attribute_valuesArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    sku?: boolean
    price?: boolean
    sale_price?: boolean
    stock?: boolean
    size?: boolean
    image_url?: boolean
    barcode?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    sku?: boolean
    price?: boolean
    sale_price?: boolean
    stock?: boolean
    size?: boolean
    image_url?: boolean
    barcode?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    sku?: boolean
    price?: boolean
    sale_price?: boolean
    stock?: boolean
    size?: boolean
    image_url?: boolean
    barcode?: boolean
  }

  export type ProductVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "product_id" | "sku" | "price" | "sale_price" | "stock" | "size" | "image_url" | "barcode", ExtArgs["result"]["productVariant"]>
  export type ProductVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute_values?: boolean | ProductVariant$attribute_valuesArgs<ExtArgs>
    _count?: boolean | ProductVariantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariant"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      attribute_values: Prisma.$AttributeValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      product_id: string
      sku: string
      price: Prisma.Decimal
      sale_price: Prisma.Decimal | null
      stock: number
      size: Prisma.JsonValue
      image_url: string | null
      barcode: string | null
    }, ExtArgs["result"]["productVariant"]>
    composites: {}
  }

  type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = $Result.GetResult<Prisma.$ProductVariantPayload, S>

  type ProductVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductVariantCountAggregateInputType | true
    }

  export interface ProductVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'], meta: { name: 'ProductVariant' } }
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     * 
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariantFindManyArgs>(args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     * 
     */
    create<T extends ProductVariantCreateArgs>(args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariantCreateManyArgs>(args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     * 
     */
    delete<T extends ProductVariantDeleteArgs>(args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariantUpdateArgs>(args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants and returns the data updated in the database.
     * @param {ProductVariantUpdateManyAndReturnArgs} args - Arguments to update many ProductVariants.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
    **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductVariantAggregateArgs>(args: Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariant model
   */
  readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attribute_values<T extends ProductVariant$attribute_valuesArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$attribute_valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", 'String'>
    readonly created_at: FieldRef<"ProductVariant", 'DateTime'>
    readonly updated_at: FieldRef<"ProductVariant", 'DateTime'>
    readonly product_id: FieldRef<"ProductVariant", 'String'>
    readonly sku: FieldRef<"ProductVariant", 'String'>
    readonly price: FieldRef<"ProductVariant", 'Decimal'>
    readonly sale_price: FieldRef<"ProductVariant", 'Decimal'>
    readonly stock: FieldRef<"ProductVariant", 'Int'>
    readonly size: FieldRef<"ProductVariant", 'Json'>
    readonly image_url: FieldRef<"ProductVariant", 'String'>
    readonly barcode: FieldRef<"ProductVariant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
  }

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
  }

  /**
   * ProductVariant updateManyAndReturn
   */
  export type ProductVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
  }

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to delete.
     */
    limit?: number
  }

  /**
   * ProductVariant.attribute_values
   */
  export type ProductVariant$attribute_valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    where?: AttributeValueWhereInput
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    cursor?: AttributeValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
  }


  /**
   * Model ProductAttribute
   */

  export type AggregateProductAttribute = {
    _count: ProductAttributeCountAggregateOutputType | null
    _min: ProductAttributeMinAggregateOutputType | null
    _max: ProductAttributeMaxAggregateOutputType | null
  }

  export type ProductAttributeMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    product_id: string | null
    attribute_id: string | null
  }

  export type ProductAttributeMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    product_id: string | null
    attribute_id: string | null
  }

  export type ProductAttributeCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    product_id: number
    attribute_id: number
    _all: number
  }


  export type ProductAttributeMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    attribute_id?: true
  }

  export type ProductAttributeMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    attribute_id?: true
  }

  export type ProductAttributeCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    product_id?: true
    attribute_id?: true
    _all?: true
  }

  export type ProductAttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttribute to aggregate.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductAttributes
    **/
    _count?: true | ProductAttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductAttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductAttributeMaxAggregateInputType
  }

  export type GetProductAttributeAggregateType<T extends ProductAttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateProductAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductAttribute[P]>
      : GetScalarType<T[P], AggregateProductAttribute[P]>
  }




  export type ProductAttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithAggregationInput | ProductAttributeOrderByWithAggregationInput[]
    by: ProductAttributeScalarFieldEnum[] | ProductAttributeScalarFieldEnum
    having?: ProductAttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductAttributeCountAggregateInputType | true
    _min?: ProductAttributeMinAggregateInputType
    _max?: ProductAttributeMaxAggregateInputType
  }

  export type ProductAttributeGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    product_id: string
    attribute_id: string
    _count: ProductAttributeCountAggregateOutputType | null
    _min: ProductAttributeMinAggregateOutputType | null
    _max: ProductAttributeMaxAggregateOutputType | null
  }

  type GetProductAttributeGroupByPayload<T extends ProductAttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductAttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductAttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductAttributeGroupByOutputType[P]>
            : GetScalarType<T[P], ProductAttributeGroupByOutputType[P]>
        }
      >
    >


  export type ProductAttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    attribute_id?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
    values?: boolean | ProductAttribute$valuesArgs<ExtArgs>
    _count?: boolean | ProductAttributeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttribute"]>

  export type ProductAttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    attribute_id?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttribute"]>

  export type ProductAttributeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    attribute_id?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productAttribute"]>

  export type ProductAttributeSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    product_id?: boolean
    attribute_id?: boolean
  }

  export type ProductAttributeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "product_id" | "attribute_id", ExtArgs["result"]["productAttribute"]>
  export type ProductAttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
    values?: boolean | ProductAttribute$valuesArgs<ExtArgs>
    _count?: boolean | ProductAttributeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductAttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type ProductAttributeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }

  export type $ProductAttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductAttribute"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      attribute: Prisma.$AttributePayload<ExtArgs>
      values: Prisma.$AttributeValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      product_id: string
      attribute_id: string
    }, ExtArgs["result"]["productAttribute"]>
    composites: {}
  }

  type ProductAttributeGetPayload<S extends boolean | null | undefined | ProductAttributeDefaultArgs> = $Result.GetResult<Prisma.$ProductAttributePayload, S>

  type ProductAttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductAttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductAttributeCountAggregateInputType | true
    }

  export interface ProductAttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductAttribute'], meta: { name: 'ProductAttribute' } }
    /**
     * Find zero or one ProductAttribute that matches the filter.
     * @param {ProductAttributeFindUniqueArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductAttributeFindUniqueArgs>(args: SelectSubset<T, ProductAttributeFindUniqueArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductAttribute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductAttributeFindUniqueOrThrowArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductAttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductAttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductAttribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindFirstArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductAttributeFindFirstArgs>(args?: SelectSubset<T, ProductAttributeFindFirstArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductAttribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindFirstOrThrowArgs} args - Arguments to find a ProductAttribute
     * @example
     * // Get one ProductAttribute
     * const productAttribute = await prisma.productAttribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductAttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductAttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductAttributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductAttributes
     * const productAttributes = await prisma.productAttribute.findMany()
     * 
     * // Get first 10 ProductAttributes
     * const productAttributes = await prisma.productAttribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productAttributeWithIdOnly = await prisma.productAttribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductAttributeFindManyArgs>(args?: SelectSubset<T, ProductAttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductAttribute.
     * @param {ProductAttributeCreateArgs} args - Arguments to create a ProductAttribute.
     * @example
     * // Create one ProductAttribute
     * const ProductAttribute = await prisma.productAttribute.create({
     *   data: {
     *     // ... data to create a ProductAttribute
     *   }
     * })
     * 
     */
    create<T extends ProductAttributeCreateArgs>(args: SelectSubset<T, ProductAttributeCreateArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductAttributes.
     * @param {ProductAttributeCreateManyArgs} args - Arguments to create many ProductAttributes.
     * @example
     * // Create many ProductAttributes
     * const productAttribute = await prisma.productAttribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductAttributeCreateManyArgs>(args?: SelectSubset<T, ProductAttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductAttributes and returns the data saved in the database.
     * @param {ProductAttributeCreateManyAndReturnArgs} args - Arguments to create many ProductAttributes.
     * @example
     * // Create many ProductAttributes
     * const productAttribute = await prisma.productAttribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductAttributes and only return the `id`
     * const productAttributeWithIdOnly = await prisma.productAttribute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductAttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductAttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductAttribute.
     * @param {ProductAttributeDeleteArgs} args - Arguments to delete one ProductAttribute.
     * @example
     * // Delete one ProductAttribute
     * const ProductAttribute = await prisma.productAttribute.delete({
     *   where: {
     *     // ... filter to delete one ProductAttribute
     *   }
     * })
     * 
     */
    delete<T extends ProductAttributeDeleteArgs>(args: SelectSubset<T, ProductAttributeDeleteArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductAttribute.
     * @param {ProductAttributeUpdateArgs} args - Arguments to update one ProductAttribute.
     * @example
     * // Update one ProductAttribute
     * const productAttribute = await prisma.productAttribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductAttributeUpdateArgs>(args: SelectSubset<T, ProductAttributeUpdateArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductAttributes.
     * @param {ProductAttributeDeleteManyArgs} args - Arguments to filter ProductAttributes to delete.
     * @example
     * // Delete a few ProductAttributes
     * const { count } = await prisma.productAttribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductAttributeDeleteManyArgs>(args?: SelectSubset<T, ProductAttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductAttributes
     * const productAttribute = await prisma.productAttribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductAttributeUpdateManyArgs>(args: SelectSubset<T, ProductAttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductAttributes and returns the data updated in the database.
     * @param {ProductAttributeUpdateManyAndReturnArgs} args - Arguments to update many ProductAttributes.
     * @example
     * // Update many ProductAttributes
     * const productAttribute = await prisma.productAttribute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductAttributes and only return the `id`
     * const productAttributeWithIdOnly = await prisma.productAttribute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductAttributeUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductAttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductAttribute.
     * @param {ProductAttributeUpsertArgs} args - Arguments to update or create a ProductAttribute.
     * @example
     * // Update or create a ProductAttribute
     * const productAttribute = await prisma.productAttribute.upsert({
     *   create: {
     *     // ... data to create a ProductAttribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductAttribute we want to update
     *   }
     * })
     */
    upsert<T extends ProductAttributeUpsertArgs>(args: SelectSubset<T, ProductAttributeUpsertArgs<ExtArgs>>): Prisma__ProductAttributeClient<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductAttributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeCountArgs} args - Arguments to filter ProductAttributes to count.
     * @example
     * // Count the number of ProductAttributes
     * const count = await prisma.productAttribute.count({
     *   where: {
     *     // ... the filter for the ProductAttributes we want to count
     *   }
     * })
    **/
    count<T extends ProductAttributeCountArgs>(
      args?: Subset<T, ProductAttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductAttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAttributeAggregateArgs>(args: Subset<T, ProductAttributeAggregateArgs>): Prisma.PrismaPromise<GetProductAttributeAggregateType<T>>

    /**
     * Group by ProductAttribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductAttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductAttributeGroupByArgs['orderBy'] }
        : { orderBy?: ProductAttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductAttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductAttribute model
   */
  readonly fields: ProductAttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductAttribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductAttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attribute<T extends AttributeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttributeDefaultArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    values<T extends ProductAttribute$valuesArgs<ExtArgs> = {}>(args?: Subset<T, ProductAttribute$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductAttribute model
   */
  interface ProductAttributeFieldRefs {
    readonly id: FieldRef<"ProductAttribute", 'String'>
    readonly created_at: FieldRef<"ProductAttribute", 'DateTime'>
    readonly updated_at: FieldRef<"ProductAttribute", 'DateTime'>
    readonly product_id: FieldRef<"ProductAttribute", 'String'>
    readonly attribute_id: FieldRef<"ProductAttribute", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductAttribute findUnique
   */
  export type ProductAttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute findUniqueOrThrow
   */
  export type ProductAttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute findFirst
   */
  export type ProductAttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributes.
     */
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute findFirstOrThrow
   */
  export type ProductAttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttribute to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductAttributes.
     */
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute findMany
   */
  export type ProductAttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter, which ProductAttributes to fetch.
     */
    where?: ProductAttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductAttributes to fetch.
     */
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductAttributes.
     */
    cursor?: ProductAttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductAttributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductAttributes.
     */
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * ProductAttribute create
   */
  export type ProductAttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductAttribute.
     */
    data: XOR<ProductAttributeCreateInput, ProductAttributeUncheckedCreateInput>
  }

  /**
   * ProductAttribute createMany
   */
  export type ProductAttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductAttributes.
     */
    data: ProductAttributeCreateManyInput | ProductAttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductAttribute createManyAndReturn
   */
  export type ProductAttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * The data used to create many ProductAttributes.
     */
    data: ProductAttributeCreateManyInput | ProductAttributeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductAttribute update
   */
  export type ProductAttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductAttribute.
     */
    data: XOR<ProductAttributeUpdateInput, ProductAttributeUncheckedUpdateInput>
    /**
     * Choose, which ProductAttribute to update.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute updateMany
   */
  export type ProductAttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductAttributes.
     */
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyInput>
    /**
     * Filter which ProductAttributes to update
     */
    where?: ProductAttributeWhereInput
    /**
     * Limit how many ProductAttributes to update.
     */
    limit?: number
  }

  /**
   * ProductAttribute updateManyAndReturn
   */
  export type ProductAttributeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * The data used to update ProductAttributes.
     */
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyInput>
    /**
     * Filter which ProductAttributes to update
     */
    where?: ProductAttributeWhereInput
    /**
     * Limit how many ProductAttributes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductAttribute upsert
   */
  export type ProductAttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductAttribute to update in case it exists.
     */
    where: ProductAttributeWhereUniqueInput
    /**
     * In case the ProductAttribute found by the `where` argument doesn't exist, create a new ProductAttribute with this data.
     */
    create: XOR<ProductAttributeCreateInput, ProductAttributeUncheckedCreateInput>
    /**
     * In case the ProductAttribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductAttributeUpdateInput, ProductAttributeUncheckedUpdateInput>
  }

  /**
   * ProductAttribute delete
   */
  export type ProductAttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    /**
     * Filter which ProductAttribute to delete.
     */
    where: ProductAttributeWhereUniqueInput
  }

  /**
   * ProductAttribute deleteMany
   */
  export type ProductAttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductAttributes to delete
     */
    where?: ProductAttributeWhereInput
    /**
     * Limit how many ProductAttributes to delete.
     */
    limit?: number
  }

  /**
   * ProductAttribute.values
   */
  export type ProductAttribute$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    where?: AttributeValueWhereInput
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    cursor?: AttributeValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * ProductAttribute without action
   */
  export type ProductAttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
  }


  /**
   * Model Attribute
   */

  export type AggregateAttribute = {
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  export type AttributeAvgAggregateOutputType = {
    display_order: number | null
  }

  export type AttributeSumAggregateOutputType = {
    display_order: number | null
  }

  export type AttributeMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    display_order: number | null
  }

  export type AttributeMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    name: string | null
    display_order: number | null
  }

  export type AttributeCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    name: number
    display_order: number
    _all: number
  }


  export type AttributeAvgAggregateInputType = {
    display_order?: true
  }

  export type AttributeSumAggregateInputType = {
    display_order?: true
  }

  export type AttributeMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    display_order?: true
  }

  export type AttributeMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    display_order?: true
  }

  export type AttributeCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    name?: true
    display_order?: true
    _all?: true
  }

  export type AttributeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attribute to aggregate.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attributes
    **/
    _count?: true | AttributeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttributeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttributeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttributeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttributeMaxAggregateInputType
  }

  export type GetAttributeAggregateType<T extends AttributeAggregateArgs> = {
        [P in keyof T & keyof AggregateAttribute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttribute[P]>
      : GetScalarType<T[P], AggregateAttribute[P]>
  }




  export type AttributeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeWhereInput
    orderBy?: AttributeOrderByWithAggregationInput | AttributeOrderByWithAggregationInput[]
    by: AttributeScalarFieldEnum[] | AttributeScalarFieldEnum
    having?: AttributeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttributeCountAggregateInputType | true
    _avg?: AttributeAvgAggregateInputType
    _sum?: AttributeSumAggregateInputType
    _min?: AttributeMinAggregateInputType
    _max?: AttributeMaxAggregateInputType
  }

  export type AttributeGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    name: string
    display_order: number | null
    _count: AttributeCountAggregateOutputType | null
    _avg: AttributeAvgAggregateOutputType | null
    _sum: AttributeSumAggregateOutputType | null
    _min: AttributeMinAggregateOutputType | null
    _max: AttributeMaxAggregateOutputType | null
  }

  type GetAttributeGroupByPayload<T extends AttributeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttributeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttributeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttributeGroupByOutputType[P]>
            : GetScalarType<T[P], AttributeGroupByOutputType[P]>
        }
      >
    >


  export type AttributeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    display_order?: boolean
    values?: boolean | Attribute$valuesArgs<ExtArgs>
    products?: boolean | Attribute$productsArgs<ExtArgs>
    _count?: boolean | AttributeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    display_order?: boolean
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    display_order?: boolean
  }, ExtArgs["result"]["attribute"]>

  export type AttributeSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    name?: boolean
    display_order?: boolean
  }

  export type AttributeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "name" | "display_order", ExtArgs["result"]["attribute"]>
  export type AttributeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | Attribute$valuesArgs<ExtArgs>
    products?: boolean | Attribute$productsArgs<ExtArgs>
    _count?: boolean | AttributeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttributeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AttributeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AttributePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attribute"
    objects: {
      values: Prisma.$AttributeValuePayload<ExtArgs>[]
      products: Prisma.$ProductAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      name: string
      display_order: number | null
    }, ExtArgs["result"]["attribute"]>
    composites: {}
  }

  type AttributeGetPayload<S extends boolean | null | undefined | AttributeDefaultArgs> = $Result.GetResult<Prisma.$AttributePayload, S>

  type AttributeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttributeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttributeCountAggregateInputType | true
    }

  export interface AttributeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attribute'], meta: { name: 'Attribute' } }
    /**
     * Find zero or one Attribute that matches the filter.
     * @param {AttributeFindUniqueArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttributeFindUniqueArgs>(args: SelectSubset<T, AttributeFindUniqueArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attribute that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttributeFindUniqueOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttributeFindUniqueOrThrowArgs>(args: SelectSubset<T, AttributeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attribute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttributeFindFirstArgs>(args?: SelectSubset<T, AttributeFindFirstArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attribute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindFirstOrThrowArgs} args - Arguments to find a Attribute
     * @example
     * // Get one Attribute
     * const attribute = await prisma.attribute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttributeFindFirstOrThrowArgs>(args?: SelectSubset<T, AttributeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attributes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attributes
     * const attributes = await prisma.attribute.findMany()
     * 
     * // Get first 10 Attributes
     * const attributes = await prisma.attribute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attributeWithIdOnly = await prisma.attribute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttributeFindManyArgs>(args?: SelectSubset<T, AttributeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attribute.
     * @param {AttributeCreateArgs} args - Arguments to create a Attribute.
     * @example
     * // Create one Attribute
     * const Attribute = await prisma.attribute.create({
     *   data: {
     *     // ... data to create a Attribute
     *   }
     * })
     * 
     */
    create<T extends AttributeCreateArgs>(args: SelectSubset<T, AttributeCreateArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attributes.
     * @param {AttributeCreateManyArgs} args - Arguments to create many Attributes.
     * @example
     * // Create many Attributes
     * const attribute = await prisma.attribute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttributeCreateManyArgs>(args?: SelectSubset<T, AttributeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attributes and returns the data saved in the database.
     * @param {AttributeCreateManyAndReturnArgs} args - Arguments to create many Attributes.
     * @example
     * // Create many Attributes
     * const attribute = await prisma.attribute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attributes and only return the `id`
     * const attributeWithIdOnly = await prisma.attribute.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttributeCreateManyAndReturnArgs>(args?: SelectSubset<T, AttributeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attribute.
     * @param {AttributeDeleteArgs} args - Arguments to delete one Attribute.
     * @example
     * // Delete one Attribute
     * const Attribute = await prisma.attribute.delete({
     *   where: {
     *     // ... filter to delete one Attribute
     *   }
     * })
     * 
     */
    delete<T extends AttributeDeleteArgs>(args: SelectSubset<T, AttributeDeleteArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attribute.
     * @param {AttributeUpdateArgs} args - Arguments to update one Attribute.
     * @example
     * // Update one Attribute
     * const attribute = await prisma.attribute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttributeUpdateArgs>(args: SelectSubset<T, AttributeUpdateArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attributes.
     * @param {AttributeDeleteManyArgs} args - Arguments to filter Attributes to delete.
     * @example
     * // Delete a few Attributes
     * const { count } = await prisma.attribute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttributeDeleteManyArgs>(args?: SelectSubset<T, AttributeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attributes
     * const attribute = await prisma.attribute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttributeUpdateManyArgs>(args: SelectSubset<T, AttributeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attributes and returns the data updated in the database.
     * @param {AttributeUpdateManyAndReturnArgs} args - Arguments to update many Attributes.
     * @example
     * // Update many Attributes
     * const attribute = await prisma.attribute.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attributes and only return the `id`
     * const attributeWithIdOnly = await prisma.attribute.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttributeUpdateManyAndReturnArgs>(args: SelectSubset<T, AttributeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attribute.
     * @param {AttributeUpsertArgs} args - Arguments to update or create a Attribute.
     * @example
     * // Update or create a Attribute
     * const attribute = await prisma.attribute.upsert({
     *   create: {
     *     // ... data to create a Attribute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attribute we want to update
     *   }
     * })
     */
    upsert<T extends AttributeUpsertArgs>(args: SelectSubset<T, AttributeUpsertArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attributes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeCountArgs} args - Arguments to filter Attributes to count.
     * @example
     * // Count the number of Attributes
     * const count = await prisma.attribute.count({
     *   where: {
     *     // ... the filter for the Attributes we want to count
     *   }
     * })
    **/
    count<T extends AttributeCountArgs>(
      args?: Subset<T, AttributeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttributeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttributeAggregateArgs>(args: Subset<T, AttributeAggregateArgs>): Prisma.PrismaPromise<GetAttributeAggregateType<T>>

    /**
     * Group by Attribute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttributeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttributeGroupByArgs['orderBy'] }
        : { orderBy?: AttributeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttributeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttributeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attribute model
   */
  readonly fields: AttributeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attribute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttributeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    values<T extends Attribute$valuesArgs<ExtArgs> = {}>(args?: Subset<T, Attribute$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Attribute$productsArgs<ExtArgs> = {}>(args?: Subset<T, Attribute$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attribute model
   */
  interface AttributeFieldRefs {
    readonly id: FieldRef<"Attribute", 'String'>
    readonly created_at: FieldRef<"Attribute", 'DateTime'>
    readonly updated_at: FieldRef<"Attribute", 'DateTime'>
    readonly name: FieldRef<"Attribute", 'String'>
    readonly display_order: FieldRef<"Attribute", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Attribute findUnique
   */
  export type AttributeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute findUniqueOrThrow
   */
  export type AttributeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute findFirst
   */
  export type AttributeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute findFirstOrThrow
   */
  export type AttributeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attribute to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attributes.
     */
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute findMany
   */
  export type AttributeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter, which Attributes to fetch.
     */
    where?: AttributeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attributes to fetch.
     */
    orderBy?: AttributeOrderByWithRelationInput | AttributeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attributes.
     */
    cursor?: AttributeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attributes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attributes.
     */
    skip?: number
    distinct?: AttributeScalarFieldEnum | AttributeScalarFieldEnum[]
  }

  /**
   * Attribute create
   */
  export type AttributeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The data needed to create a Attribute.
     */
    data: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
  }

  /**
   * Attribute createMany
   */
  export type AttributeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attributes.
     */
    data: AttributeCreateManyInput | AttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attribute createManyAndReturn
   */
  export type AttributeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * The data used to create many Attributes.
     */
    data: AttributeCreateManyInput | AttributeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attribute update
   */
  export type AttributeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The data needed to update a Attribute.
     */
    data: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
    /**
     * Choose, which Attribute to update.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute updateMany
   */
  export type AttributeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attributes.
     */
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyInput>
    /**
     * Filter which Attributes to update
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to update.
     */
    limit?: number
  }

  /**
   * Attribute updateManyAndReturn
   */
  export type AttributeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * The data used to update Attributes.
     */
    data: XOR<AttributeUpdateManyMutationInput, AttributeUncheckedUpdateManyInput>
    /**
     * Filter which Attributes to update
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to update.
     */
    limit?: number
  }

  /**
   * Attribute upsert
   */
  export type AttributeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * The filter to search for the Attribute to update in case it exists.
     */
    where: AttributeWhereUniqueInput
    /**
     * In case the Attribute found by the `where` argument doesn't exist, create a new Attribute with this data.
     */
    create: XOR<AttributeCreateInput, AttributeUncheckedCreateInput>
    /**
     * In case the Attribute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttributeUpdateInput, AttributeUncheckedUpdateInput>
  }

  /**
   * Attribute delete
   */
  export type AttributeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
    /**
     * Filter which Attribute to delete.
     */
    where: AttributeWhereUniqueInput
  }

  /**
   * Attribute deleteMany
   */
  export type AttributeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attributes to delete
     */
    where?: AttributeWhereInput
    /**
     * Limit how many Attributes to delete.
     */
    limit?: number
  }

  /**
   * Attribute.values
   */
  export type Attribute$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    where?: AttributeValueWhereInput
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    cursor?: AttributeValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * Attribute.products
   */
  export type Attribute$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    cursor?: ProductAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * Attribute without action
   */
  export type AttributeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attribute
     */
    select?: AttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attribute
     */
    omit?: AttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeInclude<ExtArgs> | null
  }


  /**
   * Model AttributeValue
   */

  export type AggregateAttributeValue = {
    _count: AttributeValueCountAggregateOutputType | null
    _avg: AttributeValueAvgAggregateOutputType | null
    _sum: AttributeValueSumAggregateOutputType | null
    _min: AttributeValueMinAggregateOutputType | null
    _max: AttributeValueMaxAggregateOutputType | null
  }

  export type AttributeValueAvgAggregateOutputType = {
    display_order: number | null
  }

  export type AttributeValueSumAggregateOutputType = {
    display_order: number | null
  }

  export type AttributeValueMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    attribute_id: string | null
    value: string | null
    display_order: number | null
  }

  export type AttributeValueMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    attribute_id: string | null
    value: string | null
    display_order: number | null
  }

  export type AttributeValueCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    attribute_id: number
    value: number
    display_order: number
    _all: number
  }


  export type AttributeValueAvgAggregateInputType = {
    display_order?: true
  }

  export type AttributeValueSumAggregateInputType = {
    display_order?: true
  }

  export type AttributeValueMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    attribute_id?: true
    value?: true
    display_order?: true
  }

  export type AttributeValueMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    attribute_id?: true
    value?: true
    display_order?: true
  }

  export type AttributeValueCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    attribute_id?: true
    value?: true
    display_order?: true
    _all?: true
  }

  export type AttributeValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttributeValue to aggregate.
     */
    where?: AttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttributeValues to fetch.
     */
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttributeValues
    **/
    _count?: true | AttributeValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttributeValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttributeValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttributeValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttributeValueMaxAggregateInputType
  }

  export type GetAttributeValueAggregateType<T extends AttributeValueAggregateArgs> = {
        [P in keyof T & keyof AggregateAttributeValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttributeValue[P]>
      : GetScalarType<T[P], AggregateAttributeValue[P]>
  }




  export type AttributeValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttributeValueWhereInput
    orderBy?: AttributeValueOrderByWithAggregationInput | AttributeValueOrderByWithAggregationInput[]
    by: AttributeValueScalarFieldEnum[] | AttributeValueScalarFieldEnum
    having?: AttributeValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttributeValueCountAggregateInputType | true
    _avg?: AttributeValueAvgAggregateInputType
    _sum?: AttributeValueSumAggregateInputType
    _min?: AttributeValueMinAggregateInputType
    _max?: AttributeValueMaxAggregateInputType
  }

  export type AttributeValueGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    attribute_id: string
    value: string
    display_order: number | null
    _count: AttributeValueCountAggregateOutputType | null
    _avg: AttributeValueAvgAggregateOutputType | null
    _sum: AttributeValueSumAggregateOutputType | null
    _min: AttributeValueMinAggregateOutputType | null
    _max: AttributeValueMaxAggregateOutputType | null
  }

  type GetAttributeValueGroupByPayload<T extends AttributeValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttributeValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttributeValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttributeValueGroupByOutputType[P]>
            : GetScalarType<T[P], AttributeValueGroupByOutputType[P]>
        }
      >
    >


  export type AttributeValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    attribute_id?: boolean
    value?: boolean
    display_order?: boolean
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
    variants?: boolean | AttributeValue$variantsArgs<ExtArgs>
    productAttributes?: boolean | AttributeValue$productAttributesArgs<ExtArgs>
    _count?: boolean | AttributeValueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attributeValue"]>

  export type AttributeValueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    attribute_id?: boolean
    value?: boolean
    display_order?: boolean
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attributeValue"]>

  export type AttributeValueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    attribute_id?: boolean
    value?: boolean
    display_order?: boolean
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attributeValue"]>

  export type AttributeValueSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    attribute_id?: boolean
    value?: boolean
    display_order?: boolean
  }

  export type AttributeValueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "updated_at" | "attribute_id" | "value" | "display_order", ExtArgs["result"]["attributeValue"]>
  export type AttributeValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
    variants?: boolean | AttributeValue$variantsArgs<ExtArgs>
    productAttributes?: boolean | AttributeValue$productAttributesArgs<ExtArgs>
    _count?: boolean | AttributeValueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttributeValueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }
  export type AttributeValueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attribute?: boolean | AttributeDefaultArgs<ExtArgs>
  }

  export type $AttributeValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttributeValue"
    objects: {
      attribute: Prisma.$AttributePayload<ExtArgs>
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
      productAttributes: Prisma.$ProductAttributePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      attribute_id: string
      value: string
      display_order: number | null
    }, ExtArgs["result"]["attributeValue"]>
    composites: {}
  }

  type AttributeValueGetPayload<S extends boolean | null | undefined | AttributeValueDefaultArgs> = $Result.GetResult<Prisma.$AttributeValuePayload, S>

  type AttributeValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttributeValueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttributeValueCountAggregateInputType | true
    }

  export interface AttributeValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttributeValue'], meta: { name: 'AttributeValue' } }
    /**
     * Find zero or one AttributeValue that matches the filter.
     * @param {AttributeValueFindUniqueArgs} args - Arguments to find a AttributeValue
     * @example
     * // Get one AttributeValue
     * const attributeValue = await prisma.attributeValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttributeValueFindUniqueArgs>(args: SelectSubset<T, AttributeValueFindUniqueArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttributeValue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttributeValueFindUniqueOrThrowArgs} args - Arguments to find a AttributeValue
     * @example
     * // Get one AttributeValue
     * const attributeValue = await prisma.attributeValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttributeValueFindUniqueOrThrowArgs>(args: SelectSubset<T, AttributeValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttributeValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueFindFirstArgs} args - Arguments to find a AttributeValue
     * @example
     * // Get one AttributeValue
     * const attributeValue = await prisma.attributeValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttributeValueFindFirstArgs>(args?: SelectSubset<T, AttributeValueFindFirstArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttributeValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueFindFirstOrThrowArgs} args - Arguments to find a AttributeValue
     * @example
     * // Get one AttributeValue
     * const attributeValue = await prisma.attributeValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttributeValueFindFirstOrThrowArgs>(args?: SelectSubset<T, AttributeValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttributeValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttributeValues
     * const attributeValues = await prisma.attributeValue.findMany()
     * 
     * // Get first 10 AttributeValues
     * const attributeValues = await prisma.attributeValue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attributeValueWithIdOnly = await prisma.attributeValue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttributeValueFindManyArgs>(args?: SelectSubset<T, AttributeValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttributeValue.
     * @param {AttributeValueCreateArgs} args - Arguments to create a AttributeValue.
     * @example
     * // Create one AttributeValue
     * const AttributeValue = await prisma.attributeValue.create({
     *   data: {
     *     // ... data to create a AttributeValue
     *   }
     * })
     * 
     */
    create<T extends AttributeValueCreateArgs>(args: SelectSubset<T, AttributeValueCreateArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttributeValues.
     * @param {AttributeValueCreateManyArgs} args - Arguments to create many AttributeValues.
     * @example
     * // Create many AttributeValues
     * const attributeValue = await prisma.attributeValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttributeValueCreateManyArgs>(args?: SelectSubset<T, AttributeValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttributeValues and returns the data saved in the database.
     * @param {AttributeValueCreateManyAndReturnArgs} args - Arguments to create many AttributeValues.
     * @example
     * // Create many AttributeValues
     * const attributeValue = await prisma.attributeValue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttributeValues and only return the `id`
     * const attributeValueWithIdOnly = await prisma.attributeValue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttributeValueCreateManyAndReturnArgs>(args?: SelectSubset<T, AttributeValueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttributeValue.
     * @param {AttributeValueDeleteArgs} args - Arguments to delete one AttributeValue.
     * @example
     * // Delete one AttributeValue
     * const AttributeValue = await prisma.attributeValue.delete({
     *   where: {
     *     // ... filter to delete one AttributeValue
     *   }
     * })
     * 
     */
    delete<T extends AttributeValueDeleteArgs>(args: SelectSubset<T, AttributeValueDeleteArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttributeValue.
     * @param {AttributeValueUpdateArgs} args - Arguments to update one AttributeValue.
     * @example
     * // Update one AttributeValue
     * const attributeValue = await prisma.attributeValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttributeValueUpdateArgs>(args: SelectSubset<T, AttributeValueUpdateArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttributeValues.
     * @param {AttributeValueDeleteManyArgs} args - Arguments to filter AttributeValues to delete.
     * @example
     * // Delete a few AttributeValues
     * const { count } = await prisma.attributeValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttributeValueDeleteManyArgs>(args?: SelectSubset<T, AttributeValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttributeValues
     * const attributeValue = await prisma.attributeValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttributeValueUpdateManyArgs>(args: SelectSubset<T, AttributeValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttributeValues and returns the data updated in the database.
     * @param {AttributeValueUpdateManyAndReturnArgs} args - Arguments to update many AttributeValues.
     * @example
     * // Update many AttributeValues
     * const attributeValue = await prisma.attributeValue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttributeValues and only return the `id`
     * const attributeValueWithIdOnly = await prisma.attributeValue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttributeValueUpdateManyAndReturnArgs>(args: SelectSubset<T, AttributeValueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttributeValue.
     * @param {AttributeValueUpsertArgs} args - Arguments to update or create a AttributeValue.
     * @example
     * // Update or create a AttributeValue
     * const attributeValue = await prisma.attributeValue.upsert({
     *   create: {
     *     // ... data to create a AttributeValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttributeValue we want to update
     *   }
     * })
     */
    upsert<T extends AttributeValueUpsertArgs>(args: SelectSubset<T, AttributeValueUpsertArgs<ExtArgs>>): Prisma__AttributeValueClient<$Result.GetResult<Prisma.$AttributeValuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttributeValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueCountArgs} args - Arguments to filter AttributeValues to count.
     * @example
     * // Count the number of AttributeValues
     * const count = await prisma.attributeValue.count({
     *   where: {
     *     // ... the filter for the AttributeValues we want to count
     *   }
     * })
    **/
    count<T extends AttributeValueCountArgs>(
      args?: Subset<T, AttributeValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttributeValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttributeValueAggregateArgs>(args: Subset<T, AttributeValueAggregateArgs>): Prisma.PrismaPromise<GetAttributeValueAggregateType<T>>

    /**
     * Group by AttributeValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttributeValueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttributeValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttributeValueGroupByArgs['orderBy'] }
        : { orderBy?: AttributeValueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttributeValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttributeValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttributeValue model
   */
  readonly fields: AttributeValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttributeValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttributeValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attribute<T extends AttributeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttributeDefaultArgs<ExtArgs>>): Prisma__AttributeClient<$Result.GetResult<Prisma.$AttributePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    variants<T extends AttributeValue$variantsArgs<ExtArgs> = {}>(args?: Subset<T, AttributeValue$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productAttributes<T extends AttributeValue$productAttributesArgs<ExtArgs> = {}>(args?: Subset<T, AttributeValue$productAttributesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductAttributePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AttributeValue model
   */
  interface AttributeValueFieldRefs {
    readonly id: FieldRef<"AttributeValue", 'String'>
    readonly created_at: FieldRef<"AttributeValue", 'DateTime'>
    readonly updated_at: FieldRef<"AttributeValue", 'DateTime'>
    readonly attribute_id: FieldRef<"AttributeValue", 'String'>
    readonly value: FieldRef<"AttributeValue", 'String'>
    readonly display_order: FieldRef<"AttributeValue", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AttributeValue findUnique
   */
  export type AttributeValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which AttributeValue to fetch.
     */
    where: AttributeValueWhereUniqueInput
  }

  /**
   * AttributeValue findUniqueOrThrow
   */
  export type AttributeValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which AttributeValue to fetch.
     */
    where: AttributeValueWhereUniqueInput
  }

  /**
   * AttributeValue findFirst
   */
  export type AttributeValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which AttributeValue to fetch.
     */
    where?: AttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttributeValues to fetch.
     */
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttributeValues.
     */
    cursor?: AttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttributeValues.
     */
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * AttributeValue findFirstOrThrow
   */
  export type AttributeValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which AttributeValue to fetch.
     */
    where?: AttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttributeValues to fetch.
     */
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttributeValues.
     */
    cursor?: AttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttributeValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttributeValues.
     */
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * AttributeValue findMany
   */
  export type AttributeValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter, which AttributeValues to fetch.
     */
    where?: AttributeValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttributeValues to fetch.
     */
    orderBy?: AttributeValueOrderByWithRelationInput | AttributeValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttributeValues.
     */
    cursor?: AttributeValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttributeValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttributeValues.
     */
    skip?: number
    distinct?: AttributeValueScalarFieldEnum | AttributeValueScalarFieldEnum[]
  }

  /**
   * AttributeValue create
   */
  export type AttributeValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to create a AttributeValue.
     */
    data: XOR<AttributeValueCreateInput, AttributeValueUncheckedCreateInput>
  }

  /**
   * AttributeValue createMany
   */
  export type AttributeValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttributeValues.
     */
    data: AttributeValueCreateManyInput | AttributeValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttributeValue createManyAndReturn
   */
  export type AttributeValueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * The data used to create many AttributeValues.
     */
    data: AttributeValueCreateManyInput | AttributeValueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttributeValue update
   */
  export type AttributeValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * The data needed to update a AttributeValue.
     */
    data: XOR<AttributeValueUpdateInput, AttributeValueUncheckedUpdateInput>
    /**
     * Choose, which AttributeValue to update.
     */
    where: AttributeValueWhereUniqueInput
  }

  /**
   * AttributeValue updateMany
   */
  export type AttributeValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttributeValues.
     */
    data: XOR<AttributeValueUpdateManyMutationInput, AttributeValueUncheckedUpdateManyInput>
    /**
     * Filter which AttributeValues to update
     */
    where?: AttributeValueWhereInput
    /**
     * Limit how many AttributeValues to update.
     */
    limit?: number
  }

  /**
   * AttributeValue updateManyAndReturn
   */
  export type AttributeValueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * The data used to update AttributeValues.
     */
    data: XOR<AttributeValueUpdateManyMutationInput, AttributeValueUncheckedUpdateManyInput>
    /**
     * Filter which AttributeValues to update
     */
    where?: AttributeValueWhereInput
    /**
     * Limit how many AttributeValues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttributeValue upsert
   */
  export type AttributeValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * The filter to search for the AttributeValue to update in case it exists.
     */
    where: AttributeValueWhereUniqueInput
    /**
     * In case the AttributeValue found by the `where` argument doesn't exist, create a new AttributeValue with this data.
     */
    create: XOR<AttributeValueCreateInput, AttributeValueUncheckedCreateInput>
    /**
     * In case the AttributeValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttributeValueUpdateInput, AttributeValueUncheckedUpdateInput>
  }

  /**
   * AttributeValue delete
   */
  export type AttributeValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
    /**
     * Filter which AttributeValue to delete.
     */
    where: AttributeValueWhereUniqueInput
  }

  /**
   * AttributeValue deleteMany
   */
  export type AttributeValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttributeValues to delete
     */
    where?: AttributeValueWhereInput
    /**
     * Limit how many AttributeValues to delete.
     */
    limit?: number
  }

  /**
   * AttributeValue.variants
   */
  export type AttributeValue$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * AttributeValue.productAttributes
   */
  export type AttributeValue$productAttributesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductAttribute
     */
    select?: ProductAttributeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductAttribute
     */
    omit?: ProductAttributeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductAttributeInclude<ExtArgs> | null
    where?: ProductAttributeWhereInput
    orderBy?: ProductAttributeOrderByWithRelationInput | ProductAttributeOrderByWithRelationInput[]
    cursor?: ProductAttributeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductAttributeScalarFieldEnum | ProductAttributeScalarFieldEnum[]
  }

  /**
   * AttributeValue without action
   */
  export type AttributeValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttributeValue
     */
    select?: AttributeValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttributeValue
     */
    omit?: AttributeValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttributeValueInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    name: 'name',
    parent_id: 'parent_id',
    image_url: 'image_url',
    description: 'description'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    name: 'name',
    description: 'description',
    category_id: 'category_id',
    thumbnail_image_url: 'thumbnail_image_url',
    images_url: 'images_url',
    brand_id: 'brand_id',
    meta_title: 'meta_title',
    meta_description: 'meta_description',
    slug: 'slug',
    related_products: 'related_products'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductVariantScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    product_id: 'product_id',
    sku: 'sku',
    price: 'price',
    sale_price: 'sale_price',
    stock: 'stock',
    size: 'size',
    image_url: 'image_url',
    barcode: 'barcode'
  };

  export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum]


  export const ProductAttributeScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    product_id: 'product_id',
    attribute_id: 'attribute_id'
  };

  export type ProductAttributeScalarFieldEnum = (typeof ProductAttributeScalarFieldEnum)[keyof typeof ProductAttributeScalarFieldEnum]


  export const AttributeScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    name: 'name',
    display_order: 'display_order'
  };

  export type AttributeScalarFieldEnum = (typeof AttributeScalarFieldEnum)[keyof typeof AttributeScalarFieldEnum]


  export const AttributeValueScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    attribute_id: 'attribute_id',
    value: 'value',
    display_order: 'display_order'
  };

  export type AttributeValueScalarFieldEnum = (typeof AttributeValueScalarFieldEnum)[keyof typeof AttributeValueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    name?: StringFilter<"Category"> | string
    parent_id?: StringNullableFilter<"Category"> | string | null
    image_url?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    parent?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    name?: StringFilter<"Category"> | string
    parent_id?: StringNullableFilter<"Category"> | string | null
    image_url?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    parent?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    created_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    name?: StringWithAggregatesFilter<"Category"> | string
    parent_id?: StringNullableWithAggregatesFilter<"Category"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"Category"> | string | null
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category_id?: StringFilter<"Product"> | string
    thumbnail_image_url?: StringFilter<"Product"> | string
    images_url?: StringNullableListFilter<"Product">
    brand_id?: StringNullableFilter<"Product"> | string | null
    meta_title?: StringNullableFilter<"Product"> | string | null
    meta_description?: StringNullableFilter<"Product"> | string | null
    slug?: StringNullableFilter<"Product"> | string | null
    related_products?: StringNullableListFilter<"Product">
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    variants?: ProductVariantListRelationFilter
    attributes?: ProductAttributeListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category_id?: SortOrder
    thumbnail_image_url?: SortOrder
    images_url?: SortOrder
    brand_id?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    related_products?: SortOrder
    category?: CategoryOrderByWithRelationInput
    variants?: ProductVariantOrderByRelationAggregateInput
    attributes?: ProductAttributeOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category_id?: StringFilter<"Product"> | string
    thumbnail_image_url?: StringFilter<"Product"> | string
    images_url?: StringNullableListFilter<"Product">
    brand_id?: StringNullableFilter<"Product"> | string | null
    meta_title?: StringNullableFilter<"Product"> | string | null
    meta_description?: StringNullableFilter<"Product"> | string | null
    related_products?: StringNullableListFilter<"Product">
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    variants?: ProductVariantListRelationFilter
    attributes?: ProductAttributeListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category_id?: SortOrder
    thumbnail_image_url?: SortOrder
    images_url?: SortOrder
    brand_id?: SortOrderInput | SortOrder
    meta_title?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    related_products?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    created_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    category_id?: StringWithAggregatesFilter<"Product"> | string
    thumbnail_image_url?: StringWithAggregatesFilter<"Product"> | string
    images_url?: StringNullableListFilter<"Product">
    brand_id?: StringNullableWithAggregatesFilter<"Product"> | string | null
    meta_title?: StringNullableWithAggregatesFilter<"Product"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    slug?: StringNullableWithAggregatesFilter<"Product"> | string | null
    related_products?: StringNullableListFilter<"Product">
  }

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    created_at?: DateTimeFilter<"ProductVariant"> | Date | string
    updated_at?: DateTimeFilter<"ProductVariant"> | Date | string
    product_id?: StringFilter<"ProductVariant"> | string
    sku?: StringFilter<"ProductVariant"> | string
    price?: DecimalFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string
    sale_price?: DecimalNullableFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string | null
    stock?: IntFilter<"ProductVariant"> | number
    size?: JsonFilter<"ProductVariant">
    image_url?: StringNullableFilter<"ProductVariant"> | string | null
    barcode?: StringNullableFilter<"ProductVariant"> | string | null
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    attribute_values?: AttributeValueListRelationFilter
  }

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    sale_price?: SortOrderInput | SortOrder
    stock?: SortOrder
    size?: SortOrder
    image_url?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    product?: ProductOrderByWithRelationInput
    attribute_values?: AttributeValueOrderByRelationAggregateInput
  }

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    created_at?: DateTimeFilter<"ProductVariant"> | Date | string
    updated_at?: DateTimeFilter<"ProductVariant"> | Date | string
    product_id?: StringFilter<"ProductVariant"> | string
    price?: DecimalFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string
    sale_price?: DecimalNullableFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string | null
    stock?: IntFilter<"ProductVariant"> | number
    size?: JsonFilter<"ProductVariant">
    image_url?: StringNullableFilter<"ProductVariant"> | string | null
    barcode?: StringNullableFilter<"ProductVariant"> | string | null
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    attribute_values?: AttributeValueListRelationFilter
  }, "id" | "sku">

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    sale_price?: SortOrderInput | SortOrder
    stock?: SortOrder
    size?: SortOrder
    image_url?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    _count?: ProductVariantCountOrderByAggregateInput
    _avg?: ProductVariantAvgOrderByAggregateInput
    _max?: ProductVariantMaxOrderByAggregateInput
    _min?: ProductVariantMinOrderByAggregateInput
    _sum?: ProductVariantSumOrderByAggregateInput
  }

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    OR?: ProductVariantScalarWhereWithAggregatesInput[]
    NOT?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductVariant"> | string
    created_at?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
    product_id?: StringWithAggregatesFilter<"ProductVariant"> | string
    sku?: StringWithAggregatesFilter<"ProductVariant"> | string
    price?: DecimalWithAggregatesFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string
    sale_price?: DecimalNullableWithAggregatesFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string | null
    stock?: IntWithAggregatesFilter<"ProductVariant"> | number
    size?: JsonWithAggregatesFilter<"ProductVariant">
    image_url?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
    barcode?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
  }

  export type ProductAttributeWhereInput = {
    AND?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    OR?: ProductAttributeWhereInput[]
    NOT?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    id?: StringFilter<"ProductAttribute"> | string
    created_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    updated_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    product_id?: StringFilter<"ProductAttribute"> | string
    attribute_id?: StringFilter<"ProductAttribute"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
    values?: AttributeValueListRelationFilter
  }

  export type ProductAttributeOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    attribute_id?: SortOrder
    product?: ProductOrderByWithRelationInput
    attribute?: AttributeOrderByWithRelationInput
    values?: AttributeValueOrderByRelationAggregateInput
  }

  export type ProductAttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    product_id_attribute_id?: ProductAttributeProduct_idAttribute_idCompoundUniqueInput
    AND?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    OR?: ProductAttributeWhereInput[]
    NOT?: ProductAttributeWhereInput | ProductAttributeWhereInput[]
    created_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    updated_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    product_id?: StringFilter<"ProductAttribute"> | string
    attribute_id?: StringFilter<"ProductAttribute"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
    values?: AttributeValueListRelationFilter
  }, "id" | "product_id_attribute_id">

  export type ProductAttributeOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    attribute_id?: SortOrder
    _count?: ProductAttributeCountOrderByAggregateInput
    _max?: ProductAttributeMaxOrderByAggregateInput
    _min?: ProductAttributeMinOrderByAggregateInput
  }

  export type ProductAttributeScalarWhereWithAggregatesInput = {
    AND?: ProductAttributeScalarWhereWithAggregatesInput | ProductAttributeScalarWhereWithAggregatesInput[]
    OR?: ProductAttributeScalarWhereWithAggregatesInput[]
    NOT?: ProductAttributeScalarWhereWithAggregatesInput | ProductAttributeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductAttribute"> | string
    created_at?: DateTimeWithAggregatesFilter<"ProductAttribute"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ProductAttribute"> | Date | string
    product_id?: StringWithAggregatesFilter<"ProductAttribute"> | string
    attribute_id?: StringWithAggregatesFilter<"ProductAttribute"> | string
  }

  export type AttributeWhereInput = {
    AND?: AttributeWhereInput | AttributeWhereInput[]
    OR?: AttributeWhereInput[]
    NOT?: AttributeWhereInput | AttributeWhereInput[]
    id?: StringFilter<"Attribute"> | string
    created_at?: DateTimeFilter<"Attribute"> | Date | string
    updated_at?: DateTimeFilter<"Attribute"> | Date | string
    name?: StringFilter<"Attribute"> | string
    display_order?: IntNullableFilter<"Attribute"> | number | null
    values?: AttributeValueListRelationFilter
    products?: ProductAttributeListRelationFilter
  }

  export type AttributeOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    display_order?: SortOrderInput | SortOrder
    values?: AttributeValueOrderByRelationAggregateInput
    products?: ProductAttributeOrderByRelationAggregateInput
  }

  export type AttributeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AttributeWhereInput | AttributeWhereInput[]
    OR?: AttributeWhereInput[]
    NOT?: AttributeWhereInput | AttributeWhereInput[]
    created_at?: DateTimeFilter<"Attribute"> | Date | string
    updated_at?: DateTimeFilter<"Attribute"> | Date | string
    display_order?: IntNullableFilter<"Attribute"> | number | null
    values?: AttributeValueListRelationFilter
    products?: ProductAttributeListRelationFilter
  }, "id" | "name">

  export type AttributeOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    display_order?: SortOrderInput | SortOrder
    _count?: AttributeCountOrderByAggregateInput
    _avg?: AttributeAvgOrderByAggregateInput
    _max?: AttributeMaxOrderByAggregateInput
    _min?: AttributeMinOrderByAggregateInput
    _sum?: AttributeSumOrderByAggregateInput
  }

  export type AttributeScalarWhereWithAggregatesInput = {
    AND?: AttributeScalarWhereWithAggregatesInput | AttributeScalarWhereWithAggregatesInput[]
    OR?: AttributeScalarWhereWithAggregatesInput[]
    NOT?: AttributeScalarWhereWithAggregatesInput | AttributeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attribute"> | string
    created_at?: DateTimeWithAggregatesFilter<"Attribute"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Attribute"> | Date | string
    name?: StringWithAggregatesFilter<"Attribute"> | string
    display_order?: IntNullableWithAggregatesFilter<"Attribute"> | number | null
  }

  export type AttributeValueWhereInput = {
    AND?: AttributeValueWhereInput | AttributeValueWhereInput[]
    OR?: AttributeValueWhereInput[]
    NOT?: AttributeValueWhereInput | AttributeValueWhereInput[]
    id?: StringFilter<"AttributeValue"> | string
    created_at?: DateTimeFilter<"AttributeValue"> | Date | string
    updated_at?: DateTimeFilter<"AttributeValue"> | Date | string
    attribute_id?: StringFilter<"AttributeValue"> | string
    value?: StringFilter<"AttributeValue"> | string
    display_order?: IntNullableFilter<"AttributeValue"> | number | null
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
    variants?: ProductVariantListRelationFilter
    productAttributes?: ProductAttributeListRelationFilter
  }

  export type AttributeValueOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attribute_id?: SortOrder
    value?: SortOrder
    display_order?: SortOrderInput | SortOrder
    attribute?: AttributeOrderByWithRelationInput
    variants?: ProductVariantOrderByRelationAggregateInput
    productAttributes?: ProductAttributeOrderByRelationAggregateInput
  }

  export type AttributeValueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    attribute_id_value?: AttributeValueAttribute_idValueCompoundUniqueInput
    AND?: AttributeValueWhereInput | AttributeValueWhereInput[]
    OR?: AttributeValueWhereInput[]
    NOT?: AttributeValueWhereInput | AttributeValueWhereInput[]
    created_at?: DateTimeFilter<"AttributeValue"> | Date | string
    updated_at?: DateTimeFilter<"AttributeValue"> | Date | string
    attribute_id?: StringFilter<"AttributeValue"> | string
    value?: StringFilter<"AttributeValue"> | string
    display_order?: IntNullableFilter<"AttributeValue"> | number | null
    attribute?: XOR<AttributeScalarRelationFilter, AttributeWhereInput>
    variants?: ProductVariantListRelationFilter
    productAttributes?: ProductAttributeListRelationFilter
  }, "id" | "attribute_id_value">

  export type AttributeValueOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attribute_id?: SortOrder
    value?: SortOrder
    display_order?: SortOrderInput | SortOrder
    _count?: AttributeValueCountOrderByAggregateInput
    _avg?: AttributeValueAvgOrderByAggregateInput
    _max?: AttributeValueMaxOrderByAggregateInput
    _min?: AttributeValueMinOrderByAggregateInput
    _sum?: AttributeValueSumOrderByAggregateInput
  }

  export type AttributeValueScalarWhereWithAggregatesInput = {
    AND?: AttributeValueScalarWhereWithAggregatesInput | AttributeValueScalarWhereWithAggregatesInput[]
    OR?: AttributeValueScalarWhereWithAggregatesInput[]
    NOT?: AttributeValueScalarWhereWithAggregatesInput | AttributeValueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttributeValue"> | string
    created_at?: DateTimeWithAggregatesFilter<"AttributeValue"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AttributeValue"> | Date | string
    attribute_id?: StringWithAggregatesFilter<"AttributeValue"> | string
    value?: StringWithAggregatesFilter<"AttributeValue"> | string
    display_order?: IntNullableWithAggregatesFilter<"AttributeValue"> | number | null
  }

  export type CategoryCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    parent_id?: string | null
    image_url?: string | null
    description?: string | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    parent_id?: string | null
    image_url?: string | null
    description?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    category: CategoryCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    category_id: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    category_id: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
  }

  export type ProductVariantCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
    product: ProductCreateNestedOneWithoutVariantsInput
    attribute_values?: AttributeValueCreateNestedManyWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
    attribute_values?: AttributeValueUncheckedCreateNestedManyWithoutVariantsInput
  }

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
    attribute_values?: AttributeValueUpdateManyWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    attribute_values?: AttributeValueUncheckedUpdateManyWithoutVariantsNestedInput
  }

  export type ProductVariantCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
  }

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductAttributeCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product: ProductCreateNestedOneWithoutAttributesInput
    attribute: AttributeCreateNestedOneWithoutProductsInput
    values?: AttributeValueCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    attribute_id: string
    values?: AttributeValueUncheckedCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutAttributesNestedInput
    attribute?: AttributeUpdateOneRequiredWithoutProductsNestedInput
    values?: AttributeValueUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    values?: AttributeValueUncheckedUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    attribute_id: string
  }

  export type ProductAttributeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductAttributeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    attribute_id?: StringFieldUpdateOperationsInput | string
  }

  export type AttributeCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    values?: AttributeValueCreateNestedManyWithoutAttributeInput
    products?: ProductAttributeCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    values?: AttributeValueUncheckedCreateNestedManyWithoutAttributeInput
    products?: ProductAttributeUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    values?: AttributeValueUpdateManyWithoutAttributeNestedInput
    products?: ProductAttributeUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    values?: AttributeValueUncheckedUpdateManyWithoutAttributeNestedInput
    products?: ProductAttributeUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
  }

  export type AttributeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeValueCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
    attribute: AttributeCreateNestedOneWithoutValuesInput
    variants?: ProductVariantCreateNestedManyWithoutAttribute_valuesInput
    productAttributes?: ProductAttributeCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
    value: string
    display_order?: number | null
    variants?: ProductVariantUncheckedCreateNestedManyWithoutAttribute_valuesInput
    productAttributes?: ProductAttributeUncheckedCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    attribute?: AttributeUpdateOneRequiredWithoutValuesNestedInput
    variants?: ProductVariantUpdateManyWithoutAttribute_valuesNestedInput
    productAttributes?: ProductAttributeUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    variants?: ProductVariantUncheckedUpdateManyWithoutAttribute_valuesNestedInput
    productAttributes?: ProductAttributeUncheckedUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
    value: string
    display_order?: number | null
  }

  export type AttributeValueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeValueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    parent_id?: SortOrder
    image_url?: SortOrder
    description?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput
    some?: ProductVariantWhereInput
    none?: ProductVariantWhereInput
  }

  export type ProductAttributeListRelationFilter = {
    every?: ProductAttributeWhereInput
    some?: ProductAttributeWhereInput
    none?: ProductAttributeWhereInput
  }

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductAttributeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category_id?: SortOrder
    thumbnail_image_url?: SortOrder
    images_url?: SortOrder
    brand_id?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    slug?: SortOrder
    related_products?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category_id?: SortOrder
    thumbnail_image_url?: SortOrder
    brand_id?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    slug?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category_id?: SortOrder
    thumbnail_image_url?: SortOrder
    brand_id?: SortOrder
    meta_title?: SortOrder
    meta_description?: SortOrder
    slug?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type AttributeValueListRelationFilter = {
    every?: AttributeValueWhereInput
    some?: AttributeValueWhereInput
    none?: AttributeValueWhereInput
  }

  export type AttributeValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    sale_price?: SortOrder
    stock?: SortOrder
    size?: SortOrder
    image_url?: SortOrder
    barcode?: SortOrder
  }

  export type ProductVariantAvgOrderByAggregateInput = {
    price?: SortOrder
    sale_price?: SortOrder
    stock?: SortOrder
  }

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    sale_price?: SortOrder
    stock?: SortOrder
    image_url?: SortOrder
    barcode?: SortOrder
  }

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    sale_price?: SortOrder
    stock?: SortOrder
    image_url?: SortOrder
    barcode?: SortOrder
  }

  export type ProductVariantSumOrderByAggregateInput = {
    price?: SortOrder
    sale_price?: SortOrder
    stock?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type AttributeScalarRelationFilter = {
    is?: AttributeWhereInput
    isNot?: AttributeWhereInput
  }

  export type ProductAttributeProduct_idAttribute_idCompoundUniqueInput = {
    product_id: string
    attribute_id: string
  }

  export type ProductAttributeCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    attribute_id?: SortOrder
  }

  export type ProductAttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    attribute_id?: SortOrder
  }

  export type ProductAttributeMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    product_id?: SortOrder
    attribute_id?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AttributeCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeAvgOrderByAggregateInput = {
    display_order?: SortOrder
  }

  export type AttributeMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    name?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeSumOrderByAggregateInput = {
    display_order?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AttributeValueAttribute_idValueCompoundUniqueInput = {
    attribute_id: string
    value: string
  }

  export type AttributeValueCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attribute_id?: SortOrder
    value?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeValueAvgOrderByAggregateInput = {
    display_order?: SortOrder
  }

  export type AttributeValueMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attribute_id?: SortOrder
    value?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeValueMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attribute_id?: SortOrder
    value?: SortOrder
    display_order?: SortOrder
  }

  export type AttributeValueSumOrderByAggregateInput = {
    display_order?: SortOrder
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateimages_urlInput = {
    set: string[]
  }

  export type ProductCreaterelated_productsInput = {
    set: string[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductVariantCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductAttributeCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductAttributeUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type ProductUpdateimages_urlInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductUpdaterelated_productsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductVariantUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductAttributeUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutProductInput | ProductAttributeUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutProductInput | ProductAttributeUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutProductInput | ProductAttributeUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput> | ProductVariantCreateWithoutProductInput[] | ProductVariantUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutProductInput | ProductVariantCreateOrConnectWithoutProductInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutProductInput | ProductVariantUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductVariantCreateManyProductInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutProductInput | ProductVariantUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutProductInput | ProductVariantUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductAttributeUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput> | ProductAttributeCreateWithoutProductInput[] | ProductAttributeUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutProductInput | ProductAttributeCreateOrConnectWithoutProductInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutProductInput | ProductAttributeUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductAttributeCreateManyProductInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutProductInput | ProductAttributeUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutProductInput | ProductAttributeUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    connect?: ProductWhereUniqueInput
  }

  export type AttributeValueCreateNestedManyWithoutVariantsInput = {
    create?: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput> | AttributeValueCreateWithoutVariantsInput[] | AttributeValueUncheckedCreateWithoutVariantsInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutVariantsInput | AttributeValueCreateOrConnectWithoutVariantsInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type AttributeValueUncheckedCreateNestedManyWithoutVariantsInput = {
    create?: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput> | AttributeValueCreateWithoutVariantsInput[] | AttributeValueUncheckedCreateWithoutVariantsInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutVariantsInput | AttributeValueCreateOrConnectWithoutVariantsInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutVariantsInput
    upsert?: ProductUpsertWithoutVariantsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutVariantsInput, ProductUpdateWithoutVariantsInput>, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type AttributeValueUpdateManyWithoutVariantsNestedInput = {
    create?: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput> | AttributeValueCreateWithoutVariantsInput[] | AttributeValueUncheckedCreateWithoutVariantsInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutVariantsInput | AttributeValueCreateOrConnectWithoutVariantsInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutVariantsInput | AttributeValueUpsertWithWhereUniqueWithoutVariantsInput[]
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutVariantsInput | AttributeValueUpdateWithWhereUniqueWithoutVariantsInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutVariantsInput | AttributeValueUpdateManyWithWhereWithoutVariantsInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type AttributeValueUncheckedUpdateManyWithoutVariantsNestedInput = {
    create?: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput> | AttributeValueCreateWithoutVariantsInput[] | AttributeValueUncheckedCreateWithoutVariantsInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutVariantsInput | AttributeValueCreateOrConnectWithoutVariantsInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutVariantsInput | AttributeValueUpsertWithWhereUniqueWithoutVariantsInput[]
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutVariantsInput | AttributeValueUpdateWithWhereUniqueWithoutVariantsInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutVariantsInput | AttributeValueUpdateManyWithWhereWithoutVariantsInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutAttributesInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    connect?: ProductWhereUniqueInput
  }

  export type AttributeCreateNestedOneWithoutProductsInput = {
    create?: XOR<AttributeCreateWithoutProductsInput, AttributeUncheckedCreateWithoutProductsInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutProductsInput
    connect?: AttributeWhereUniqueInput
  }

  export type AttributeValueCreateNestedManyWithoutProductAttributesInput = {
    create?: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput> | AttributeValueCreateWithoutProductAttributesInput[] | AttributeValueUncheckedCreateWithoutProductAttributesInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutProductAttributesInput | AttributeValueCreateOrConnectWithoutProductAttributesInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type AttributeValueUncheckedCreateNestedManyWithoutProductAttributesInput = {
    create?: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput> | AttributeValueCreateWithoutProductAttributesInput[] | AttributeValueUncheckedCreateWithoutProductAttributesInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutProductAttributesInput | AttributeValueCreateOrConnectWithoutProductAttributesInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutAttributesNestedInput = {
    create?: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutAttributesInput
    upsert?: ProductUpsertWithoutAttributesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutAttributesInput, ProductUpdateWithoutAttributesInput>, ProductUncheckedUpdateWithoutAttributesInput>
  }

  export type AttributeUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<AttributeCreateWithoutProductsInput, AttributeUncheckedCreateWithoutProductsInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutProductsInput
    upsert?: AttributeUpsertWithoutProductsInput
    connect?: AttributeWhereUniqueInput
    update?: XOR<XOR<AttributeUpdateToOneWithWhereWithoutProductsInput, AttributeUpdateWithoutProductsInput>, AttributeUncheckedUpdateWithoutProductsInput>
  }

  export type AttributeValueUpdateManyWithoutProductAttributesNestedInput = {
    create?: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput> | AttributeValueCreateWithoutProductAttributesInput[] | AttributeValueUncheckedCreateWithoutProductAttributesInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutProductAttributesInput | AttributeValueCreateOrConnectWithoutProductAttributesInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutProductAttributesInput | AttributeValueUpsertWithWhereUniqueWithoutProductAttributesInput[]
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutProductAttributesInput | AttributeValueUpdateWithWhereUniqueWithoutProductAttributesInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutProductAttributesInput | AttributeValueUpdateManyWithWhereWithoutProductAttributesInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type AttributeValueUncheckedUpdateManyWithoutProductAttributesNestedInput = {
    create?: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput> | AttributeValueCreateWithoutProductAttributesInput[] | AttributeValueUncheckedCreateWithoutProductAttributesInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutProductAttributesInput | AttributeValueCreateOrConnectWithoutProductAttributesInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutProductAttributesInput | AttributeValueUpsertWithWhereUniqueWithoutProductAttributesInput[]
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutProductAttributesInput | AttributeValueUpdateWithWhereUniqueWithoutProductAttributesInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutProductAttributesInput | AttributeValueUpdateManyWithWhereWithoutProductAttributesInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type AttributeValueCreateNestedManyWithoutAttributeInput = {
    create?: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput> | AttributeValueCreateWithoutAttributeInput[] | AttributeValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutAttributeInput | AttributeValueCreateOrConnectWithoutAttributeInput[]
    createMany?: AttributeValueCreateManyAttributeInputEnvelope
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type ProductAttributeCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput> | ProductAttributeCreateWithoutAttributeInput[] | ProductAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutAttributeInput | ProductAttributeCreateOrConnectWithoutAttributeInput[]
    createMany?: ProductAttributeCreateManyAttributeInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type AttributeValueUncheckedCreateNestedManyWithoutAttributeInput = {
    create?: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput> | AttributeValueCreateWithoutAttributeInput[] | AttributeValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutAttributeInput | AttributeValueCreateOrConnectWithoutAttributeInput[]
    createMany?: AttributeValueCreateManyAttributeInputEnvelope
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
  }

  export type ProductAttributeUncheckedCreateNestedManyWithoutAttributeInput = {
    create?: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput> | ProductAttributeCreateWithoutAttributeInput[] | ProductAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutAttributeInput | ProductAttributeCreateOrConnectWithoutAttributeInput[]
    createMany?: ProductAttributeCreateManyAttributeInputEnvelope
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttributeValueUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput> | AttributeValueCreateWithoutAttributeInput[] | AttributeValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutAttributeInput | AttributeValueCreateOrConnectWithoutAttributeInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutAttributeInput | AttributeValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: AttributeValueCreateManyAttributeInputEnvelope
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutAttributeInput | AttributeValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutAttributeInput | AttributeValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type ProductAttributeUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput> | ProductAttributeCreateWithoutAttributeInput[] | ProductAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutAttributeInput | ProductAttributeCreateOrConnectWithoutAttributeInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutAttributeInput | ProductAttributeUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ProductAttributeCreateManyAttributeInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutAttributeInput | ProductAttributeUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutAttributeInput | ProductAttributeUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type AttributeValueUncheckedUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput> | AttributeValueCreateWithoutAttributeInput[] | AttributeValueUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: AttributeValueCreateOrConnectWithoutAttributeInput | AttributeValueCreateOrConnectWithoutAttributeInput[]
    upsert?: AttributeValueUpsertWithWhereUniqueWithoutAttributeInput | AttributeValueUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: AttributeValueCreateManyAttributeInputEnvelope
    set?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    disconnect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    delete?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    connect?: AttributeValueWhereUniqueInput | AttributeValueWhereUniqueInput[]
    update?: AttributeValueUpdateWithWhereUniqueWithoutAttributeInput | AttributeValueUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: AttributeValueUpdateManyWithWhereWithoutAttributeInput | AttributeValueUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
  }

  export type ProductAttributeUncheckedUpdateManyWithoutAttributeNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput> | ProductAttributeCreateWithoutAttributeInput[] | ProductAttributeUncheckedCreateWithoutAttributeInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutAttributeInput | ProductAttributeCreateOrConnectWithoutAttributeInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutAttributeInput | ProductAttributeUpsertWithWhereUniqueWithoutAttributeInput[]
    createMany?: ProductAttributeCreateManyAttributeInputEnvelope
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutAttributeInput | ProductAttributeUpdateWithWhereUniqueWithoutAttributeInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutAttributeInput | ProductAttributeUpdateManyWithWhereWithoutAttributeInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type AttributeCreateNestedOneWithoutValuesInput = {
    create?: XOR<AttributeCreateWithoutValuesInput, AttributeUncheckedCreateWithoutValuesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutValuesInput
    connect?: AttributeWhereUniqueInput
  }

  export type ProductVariantCreateNestedManyWithoutAttribute_valuesInput = {
    create?: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput> | ProductVariantCreateWithoutAttribute_valuesInput[] | ProductVariantUncheckedCreateWithoutAttribute_valuesInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutAttribute_valuesInput | ProductVariantCreateOrConnectWithoutAttribute_valuesInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductAttributeCreateNestedManyWithoutValuesInput = {
    create?: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput> | ProductAttributeCreateWithoutValuesInput[] | ProductAttributeUncheckedCreateWithoutValuesInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutValuesInput | ProductAttributeCreateOrConnectWithoutValuesInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutAttribute_valuesInput = {
    create?: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput> | ProductVariantCreateWithoutAttribute_valuesInput[] | ProductVariantUncheckedCreateWithoutAttribute_valuesInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutAttribute_valuesInput | ProductVariantCreateOrConnectWithoutAttribute_valuesInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductAttributeUncheckedCreateNestedManyWithoutValuesInput = {
    create?: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput> | ProductAttributeCreateWithoutValuesInput[] | ProductAttributeUncheckedCreateWithoutValuesInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutValuesInput | ProductAttributeCreateOrConnectWithoutValuesInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
  }

  export type AttributeUpdateOneRequiredWithoutValuesNestedInput = {
    create?: XOR<AttributeCreateWithoutValuesInput, AttributeUncheckedCreateWithoutValuesInput>
    connectOrCreate?: AttributeCreateOrConnectWithoutValuesInput
    upsert?: AttributeUpsertWithoutValuesInput
    connect?: AttributeWhereUniqueInput
    update?: XOR<XOR<AttributeUpdateToOneWithWhereWithoutValuesInput, AttributeUpdateWithoutValuesInput>, AttributeUncheckedUpdateWithoutValuesInput>
  }

  export type ProductVariantUpdateManyWithoutAttribute_valuesNestedInput = {
    create?: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput> | ProductVariantCreateWithoutAttribute_valuesInput[] | ProductVariantUncheckedCreateWithoutAttribute_valuesInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutAttribute_valuesInput | ProductVariantCreateOrConnectWithoutAttribute_valuesInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutAttribute_valuesInput | ProductVariantUpsertWithWhereUniqueWithoutAttribute_valuesInput[]
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutAttribute_valuesInput | ProductVariantUpdateWithWhereUniqueWithoutAttribute_valuesInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutAttribute_valuesInput | ProductVariantUpdateManyWithWhereWithoutAttribute_valuesInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductAttributeUpdateManyWithoutValuesNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput> | ProductAttributeCreateWithoutValuesInput[] | ProductAttributeUncheckedCreateWithoutValuesInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutValuesInput | ProductAttributeCreateOrConnectWithoutValuesInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutValuesInput | ProductAttributeUpsertWithWhereUniqueWithoutValuesInput[]
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutValuesInput | ProductAttributeUpdateWithWhereUniqueWithoutValuesInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutValuesInput | ProductAttributeUpdateManyWithWhereWithoutValuesInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type ProductVariantUncheckedUpdateManyWithoutAttribute_valuesNestedInput = {
    create?: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput> | ProductVariantCreateWithoutAttribute_valuesInput[] | ProductVariantUncheckedCreateWithoutAttribute_valuesInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutAttribute_valuesInput | ProductVariantCreateOrConnectWithoutAttribute_valuesInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutAttribute_valuesInput | ProductVariantUpsertWithWhereUniqueWithoutAttribute_valuesInput[]
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutAttribute_valuesInput | ProductVariantUpdateWithWhereUniqueWithoutAttribute_valuesInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutAttribute_valuesInput | ProductVariantUpdateManyWithWhereWithoutAttribute_valuesInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductAttributeUncheckedUpdateManyWithoutValuesNestedInput = {
    create?: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput> | ProductAttributeCreateWithoutValuesInput[] | ProductAttributeUncheckedCreateWithoutValuesInput[]
    connectOrCreate?: ProductAttributeCreateOrConnectWithoutValuesInput | ProductAttributeCreateOrConnectWithoutValuesInput[]
    upsert?: ProductAttributeUpsertWithWhereUniqueWithoutValuesInput | ProductAttributeUpsertWithWhereUniqueWithoutValuesInput[]
    set?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    disconnect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    delete?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    connect?: ProductAttributeWhereUniqueInput | ProductAttributeWhereUniqueInput[]
    update?: ProductAttributeUpdateWithWhereUniqueWithoutValuesInput | ProductAttributeUpdateWithWhereUniqueWithoutValuesInput[]
    updateMany?: ProductAttributeUpdateManyWithWhereWithoutValuesInput | ProductAttributeUpdateManyWithWhereWithoutValuesInput[]
    deleteMany?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryCreateWithoutChildrenInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    parent_id?: string | null
    image_url?: string | null
    description?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    variants?: ProductVariantCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    created_at?: DateTimeFilter<"Category"> | Date | string
    updated_at?: DateTimeFilter<"Category"> | Date | string
    name?: StringFilter<"Category"> | string
    parent_id?: StringNullableFilter<"Category"> | string | null
    image_url?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    created_at?: DateTimeFilter<"Product"> | Date | string
    updated_at?: DateTimeFilter<"Product"> | Date | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    category_id?: StringFilter<"Product"> | string
    thumbnail_image_url?: StringFilter<"Product"> | string
    images_url?: StringNullableListFilter<"Product">
    brand_id?: StringNullableFilter<"Product"> | string | null
    meta_title?: StringNullableFilter<"Product"> | string | null
    meta_description?: StringNullableFilter<"Product"> | string | null
    slug?: StringNullableFilter<"Product"> | string | null
    related_products?: StringNullableListFilter<"Product">
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    parent_id?: string | null
    image_url?: string | null
    description?: string | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductVariantCreateWithoutProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
    attribute_values?: AttributeValueCreateNestedManyWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateWithoutProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
    attribute_values?: AttributeValueUncheckedCreateNestedManyWithoutVariantsInput
  }

  export type ProductVariantCreateOrConnectWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantCreateManyProductInputEnvelope = {
    data: ProductVariantCreateManyProductInput | ProductVariantCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductAttributeCreateWithoutProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute: AttributeCreateNestedOneWithoutProductsInput
    values?: AttributeValueCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeUncheckedCreateWithoutProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
    values?: AttributeValueUncheckedCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeCreateOrConnectWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    create: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeCreateManyProductInputEnvelope = {
    data: ProductAttributeCreateManyProductInput | ProductAttributeCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
    create: XOR<ProductVariantCreateWithoutProductInput, ProductVariantUncheckedCreateWithoutProductInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutProductInput, ProductVariantUncheckedUpdateWithoutProductInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutProductInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    OR?: ProductVariantScalarWhereInput[]
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    created_at?: DateTimeFilter<"ProductVariant"> | Date | string
    updated_at?: DateTimeFilter<"ProductVariant"> | Date | string
    product_id?: StringFilter<"ProductVariant"> | string
    sku?: StringFilter<"ProductVariant"> | string
    price?: DecimalFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string
    sale_price?: DecimalNullableFilter<"ProductVariant"> | Decimal | DecimalJsLike | number | string | null
    stock?: IntFilter<"ProductVariant"> | number
    size?: JsonFilter<"ProductVariant">
    image_url?: StringNullableFilter<"ProductVariant"> | string | null
    barcode?: StringNullableFilter<"ProductVariant"> | string | null
  }

  export type ProductAttributeUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    update: XOR<ProductAttributeUpdateWithoutProductInput, ProductAttributeUncheckedUpdateWithoutProductInput>
    create: XOR<ProductAttributeCreateWithoutProductInput, ProductAttributeUncheckedCreateWithoutProductInput>
  }

  export type ProductAttributeUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductAttributeWhereUniqueInput
    data: XOR<ProductAttributeUpdateWithoutProductInput, ProductAttributeUncheckedUpdateWithoutProductInput>
  }

  export type ProductAttributeUpdateManyWithWhereWithoutProductInput = {
    where: ProductAttributeScalarWhereInput
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductAttributeScalarWhereInput = {
    AND?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
    OR?: ProductAttributeScalarWhereInput[]
    NOT?: ProductAttributeScalarWhereInput | ProductAttributeScalarWhereInput[]
    id?: StringFilter<"ProductAttribute"> | string
    created_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    updated_at?: DateTimeFilter<"ProductAttribute"> | Date | string
    product_id?: StringFilter<"ProductAttribute"> | string
    attribute_id?: StringFilter<"ProductAttribute"> | string
  }

  export type ProductCreateWithoutVariantsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    category: CategoryCreateNestedOneWithoutProductsInput
    attributes?: ProductAttributeCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    category_id: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    attributes?: ProductAttributeUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutVariantsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
  }

  export type AttributeValueCreateWithoutVariantsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
    attribute: AttributeCreateNestedOneWithoutValuesInput
    productAttributes?: ProductAttributeCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueUncheckedCreateWithoutVariantsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
    value: string
    display_order?: number | null
    productAttributes?: ProductAttributeUncheckedCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueCreateOrConnectWithoutVariantsInput = {
    where: AttributeValueWhereUniqueInput
    create: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput>
  }

  export type ProductUpsertWithoutVariantsInput = {
    update: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductCreateWithoutVariantsInput, ProductUncheckedCreateWithoutVariantsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutVariantsInput, ProductUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AttributeValueUpsertWithWhereUniqueWithoutVariantsInput = {
    where: AttributeValueWhereUniqueInput
    update: XOR<AttributeValueUpdateWithoutVariantsInput, AttributeValueUncheckedUpdateWithoutVariantsInput>
    create: XOR<AttributeValueCreateWithoutVariantsInput, AttributeValueUncheckedCreateWithoutVariantsInput>
  }

  export type AttributeValueUpdateWithWhereUniqueWithoutVariantsInput = {
    where: AttributeValueWhereUniqueInput
    data: XOR<AttributeValueUpdateWithoutVariantsInput, AttributeValueUncheckedUpdateWithoutVariantsInput>
  }

  export type AttributeValueUpdateManyWithWhereWithoutVariantsInput = {
    where: AttributeValueScalarWhereInput
    data: XOR<AttributeValueUpdateManyMutationInput, AttributeValueUncheckedUpdateManyWithoutVariantsInput>
  }

  export type AttributeValueScalarWhereInput = {
    AND?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
    OR?: AttributeValueScalarWhereInput[]
    NOT?: AttributeValueScalarWhereInput | AttributeValueScalarWhereInput[]
    id?: StringFilter<"AttributeValue"> | string
    created_at?: DateTimeFilter<"AttributeValue"> | Date | string
    updated_at?: DateTimeFilter<"AttributeValue"> | Date | string
    attribute_id?: StringFilter<"AttributeValue"> | string
    value?: StringFilter<"AttributeValue"> | string
    display_order?: IntNullableFilter<"AttributeValue"> | number | null
  }

  export type ProductCreateWithoutAttributesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    category: CategoryCreateNestedOneWithoutProductsInput
    variants?: ProductVariantCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAttributesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    category_id: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAttributesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
  }

  export type AttributeCreateWithoutProductsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    values?: AttributeValueCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateWithoutProductsInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    values?: AttributeValueUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeCreateOrConnectWithoutProductsInput = {
    where: AttributeWhereUniqueInput
    create: XOR<AttributeCreateWithoutProductsInput, AttributeUncheckedCreateWithoutProductsInput>
  }

  export type AttributeValueCreateWithoutProductAttributesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
    attribute: AttributeCreateNestedOneWithoutValuesInput
    variants?: ProductVariantCreateNestedManyWithoutAttribute_valuesInput
  }

  export type AttributeValueUncheckedCreateWithoutProductAttributesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
    value: string
    display_order?: number | null
    variants?: ProductVariantUncheckedCreateNestedManyWithoutAttribute_valuesInput
  }

  export type AttributeValueCreateOrConnectWithoutProductAttributesInput = {
    where: AttributeValueWhereUniqueInput
    create: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput>
  }

  export type ProductUpsertWithoutAttributesInput = {
    update: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
    create: XOR<ProductCreateWithoutAttributesInput, ProductUncheckedCreateWithoutAttributesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutAttributesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutAttributesInput, ProductUncheckedUpdateWithoutAttributesInput>
  }

  export type ProductUpdateWithoutAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AttributeUpsertWithoutProductsInput = {
    update: XOR<AttributeUpdateWithoutProductsInput, AttributeUncheckedUpdateWithoutProductsInput>
    create: XOR<AttributeCreateWithoutProductsInput, AttributeUncheckedCreateWithoutProductsInput>
    where?: AttributeWhereInput
  }

  export type AttributeUpdateToOneWithWhereWithoutProductsInput = {
    where?: AttributeWhereInput
    data: XOR<AttributeUpdateWithoutProductsInput, AttributeUncheckedUpdateWithoutProductsInput>
  }

  export type AttributeUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    values?: AttributeValueUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    values?: AttributeValueUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeValueUpsertWithWhereUniqueWithoutProductAttributesInput = {
    where: AttributeValueWhereUniqueInput
    update: XOR<AttributeValueUpdateWithoutProductAttributesInput, AttributeValueUncheckedUpdateWithoutProductAttributesInput>
    create: XOR<AttributeValueCreateWithoutProductAttributesInput, AttributeValueUncheckedCreateWithoutProductAttributesInput>
  }

  export type AttributeValueUpdateWithWhereUniqueWithoutProductAttributesInput = {
    where: AttributeValueWhereUniqueInput
    data: XOR<AttributeValueUpdateWithoutProductAttributesInput, AttributeValueUncheckedUpdateWithoutProductAttributesInput>
  }

  export type AttributeValueUpdateManyWithWhereWithoutProductAttributesInput = {
    where: AttributeValueScalarWhereInput
    data: XOR<AttributeValueUpdateManyMutationInput, AttributeValueUncheckedUpdateManyWithoutProductAttributesInput>
  }

  export type AttributeValueCreateWithoutAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
    variants?: ProductVariantCreateNestedManyWithoutAttribute_valuesInput
    productAttributes?: ProductAttributeCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueUncheckedCreateWithoutAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
    variants?: ProductVariantUncheckedCreateNestedManyWithoutAttribute_valuesInput
    productAttributes?: ProductAttributeUncheckedCreateNestedManyWithoutValuesInput
  }

  export type AttributeValueCreateOrConnectWithoutAttributeInput = {
    where: AttributeValueWhereUniqueInput
    create: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput>
  }

  export type AttributeValueCreateManyAttributeInputEnvelope = {
    data: AttributeValueCreateManyAttributeInput | AttributeValueCreateManyAttributeInput[]
    skipDuplicates?: boolean
  }

  export type ProductAttributeCreateWithoutAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product: ProductCreateNestedOneWithoutAttributesInput
    values?: AttributeValueCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeUncheckedCreateWithoutAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    values?: AttributeValueUncheckedCreateNestedManyWithoutProductAttributesInput
  }

  export type ProductAttributeCreateOrConnectWithoutAttributeInput = {
    where: ProductAttributeWhereUniqueInput
    create: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput>
  }

  export type ProductAttributeCreateManyAttributeInputEnvelope = {
    data: ProductAttributeCreateManyAttributeInput | ProductAttributeCreateManyAttributeInput[]
    skipDuplicates?: boolean
  }

  export type AttributeValueUpsertWithWhereUniqueWithoutAttributeInput = {
    where: AttributeValueWhereUniqueInput
    update: XOR<AttributeValueUpdateWithoutAttributeInput, AttributeValueUncheckedUpdateWithoutAttributeInput>
    create: XOR<AttributeValueCreateWithoutAttributeInput, AttributeValueUncheckedCreateWithoutAttributeInput>
  }

  export type AttributeValueUpdateWithWhereUniqueWithoutAttributeInput = {
    where: AttributeValueWhereUniqueInput
    data: XOR<AttributeValueUpdateWithoutAttributeInput, AttributeValueUncheckedUpdateWithoutAttributeInput>
  }

  export type AttributeValueUpdateManyWithWhereWithoutAttributeInput = {
    where: AttributeValueScalarWhereInput
    data: XOR<AttributeValueUpdateManyMutationInput, AttributeValueUncheckedUpdateManyWithoutAttributeInput>
  }

  export type ProductAttributeUpsertWithWhereUniqueWithoutAttributeInput = {
    where: ProductAttributeWhereUniqueInput
    update: XOR<ProductAttributeUpdateWithoutAttributeInput, ProductAttributeUncheckedUpdateWithoutAttributeInput>
    create: XOR<ProductAttributeCreateWithoutAttributeInput, ProductAttributeUncheckedCreateWithoutAttributeInput>
  }

  export type ProductAttributeUpdateWithWhereUniqueWithoutAttributeInput = {
    where: ProductAttributeWhereUniqueInput
    data: XOR<ProductAttributeUpdateWithoutAttributeInput, ProductAttributeUncheckedUpdateWithoutAttributeInput>
  }

  export type ProductAttributeUpdateManyWithWhereWithoutAttributeInput = {
    where: ProductAttributeScalarWhereInput
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyWithoutAttributeInput>
  }

  export type AttributeCreateWithoutValuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    products?: ProductAttributeCreateNestedManyWithoutAttributeInput
  }

  export type AttributeUncheckedCreateWithoutValuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    display_order?: number | null
    products?: ProductAttributeUncheckedCreateNestedManyWithoutAttributeInput
  }

  export type AttributeCreateOrConnectWithoutValuesInput = {
    where: AttributeWhereUniqueInput
    create: XOR<AttributeCreateWithoutValuesInput, AttributeUncheckedCreateWithoutValuesInput>
  }

  export type ProductVariantCreateWithoutAttribute_valuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
    product: ProductCreateNestedOneWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateWithoutAttribute_valuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
  }

  export type ProductVariantCreateOrConnectWithoutAttribute_valuesInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput>
  }

  export type ProductAttributeCreateWithoutValuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product: ProductCreateNestedOneWithoutAttributesInput
    attribute: AttributeCreateNestedOneWithoutProductsInput
  }

  export type ProductAttributeUncheckedCreateWithoutValuesInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
    attribute_id: string
  }

  export type ProductAttributeCreateOrConnectWithoutValuesInput = {
    where: ProductAttributeWhereUniqueInput
    create: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput>
  }

  export type AttributeUpsertWithoutValuesInput = {
    update: XOR<AttributeUpdateWithoutValuesInput, AttributeUncheckedUpdateWithoutValuesInput>
    create: XOR<AttributeCreateWithoutValuesInput, AttributeUncheckedCreateWithoutValuesInput>
    where?: AttributeWhereInput
  }

  export type AttributeUpdateToOneWithWhereWithoutValuesInput = {
    where?: AttributeWhereInput
    data: XOR<AttributeUpdateWithoutValuesInput, AttributeUncheckedUpdateWithoutValuesInput>
  }

  export type AttributeUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductAttributeUpdateManyWithoutAttributeNestedInput
  }

  export type AttributeUncheckedUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductAttributeUncheckedUpdateManyWithoutAttributeNestedInput
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutAttribute_valuesInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutAttribute_valuesInput, ProductVariantUncheckedUpdateWithoutAttribute_valuesInput>
    create: XOR<ProductVariantCreateWithoutAttribute_valuesInput, ProductVariantUncheckedCreateWithoutAttribute_valuesInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutAttribute_valuesInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutAttribute_valuesInput, ProductVariantUncheckedUpdateWithoutAttribute_valuesInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutAttribute_valuesInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutAttribute_valuesInput>
  }

  export type ProductAttributeUpsertWithWhereUniqueWithoutValuesInput = {
    where: ProductAttributeWhereUniqueInput
    update: XOR<ProductAttributeUpdateWithoutValuesInput, ProductAttributeUncheckedUpdateWithoutValuesInput>
    create: XOR<ProductAttributeCreateWithoutValuesInput, ProductAttributeUncheckedCreateWithoutValuesInput>
  }

  export type ProductAttributeUpdateWithWhereUniqueWithoutValuesInput = {
    where: ProductAttributeWhereUniqueInput
    data: XOR<ProductAttributeUpdateWithoutValuesInput, ProductAttributeUncheckedUpdateWithoutValuesInput>
  }

  export type ProductAttributeUpdateManyWithWhereWithoutValuesInput = {
    where: ProductAttributeScalarWhereInput
    data: XOR<ProductAttributeUpdateManyMutationInput, ProductAttributeUncheckedUpdateManyWithoutValuesInput>
  }

  export type CategoryCreateManyParentInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    image_url?: string | null
    description?: string | null
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    name: string
    description: string
    thumbnail_image_url: string
    images_url?: ProductCreateimages_urlInput | string[]
    brand_id?: string | null
    meta_title?: string | null
    meta_description?: string | null
    slug?: string | null
    related_products?: ProductCreaterelated_productsInput | string[]
  }

  export type CategoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    variants?: ProductVariantUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
    variants?: ProductVariantUncheckedUpdateManyWithoutProductNestedInput
    attributes?: ProductAttributeUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail_image_url?: StringFieldUpdateOperationsInput | string
    images_url?: ProductUpdateimages_urlInput | string[]
    brand_id?: NullableStringFieldUpdateOperationsInput | string | null
    meta_title?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: ProductUpdaterelated_productsInput | string[]
  }

  export type ProductVariantCreateManyProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    sku: string
    price: Decimal | DecimalJsLike | number | string
    sale_price?: Decimal | DecimalJsLike | number | string | null
    stock: number
    size: JsonNullValueInput | InputJsonValue
    image_url?: string | null
    barcode?: string | null
  }

  export type ProductAttributeCreateManyProductInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    attribute_id: string
  }

  export type ProductVariantUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    attribute_values?: AttributeValueUpdateManyWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    attribute_values?: AttributeValueUncheckedUpdateManyWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductAttributeUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: AttributeUpdateOneRequiredWithoutProductsNestedInput
    values?: AttributeValueUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    values?: AttributeValueUncheckedUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
  }

  export type AttributeValueUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    attribute?: AttributeUpdateOneRequiredWithoutValuesNestedInput
    productAttributes?: ProductAttributeUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    productAttributes?: ProductAttributeUncheckedUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueUncheckedUpdateManyWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeValueUpdateWithoutProductAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    attribute?: AttributeUpdateOneRequiredWithoutValuesNestedInput
    variants?: ProductVariantUpdateManyWithoutAttribute_valuesNestedInput
  }

  export type AttributeValueUncheckedUpdateWithoutProductAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    variants?: ProductVariantUncheckedUpdateManyWithoutAttribute_valuesNestedInput
  }

  export type AttributeValueUncheckedUpdateManyWithoutProductAttributesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute_id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AttributeValueCreateManyAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    value: string
    display_order?: number | null
  }

  export type ProductAttributeCreateManyAttributeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    product_id: string
  }

  export type AttributeValueUpdateWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    variants?: ProductVariantUpdateManyWithoutAttribute_valuesNestedInput
    productAttributes?: ProductAttributeUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueUncheckedUpdateWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
    variants?: ProductVariantUncheckedUpdateManyWithoutAttribute_valuesNestedInput
    productAttributes?: ProductAttributeUncheckedUpdateManyWithoutValuesNestedInput
  }

  export type AttributeValueUncheckedUpdateManyWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: StringFieldUpdateOperationsInput | string
    display_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductAttributeUpdateWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutAttributesNestedInput
    values?: AttributeValueUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    values?: AttributeValueUncheckedUpdateManyWithoutProductAttributesNestedInput
  }

  export type ProductAttributeUncheckedUpdateManyWithoutAttributeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
  }

  export type ProductVariantUpdateWithoutAttribute_valuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    product?: ProductUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutAttribute_valuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductVariantUncheckedUpdateManyWithoutAttribute_valuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    sale_price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    stock?: IntFieldUpdateOperationsInput | number
    size?: JsonNullValueInput | InputJsonValue
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductAttributeUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutAttributesNestedInput
    attribute?: AttributeUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductAttributeUncheckedUpdateWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    attribute_id?: StringFieldUpdateOperationsInput | string
  }

  export type ProductAttributeUncheckedUpdateManyWithoutValuesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    product_id?: StringFieldUpdateOperationsInput | string
    attribute_id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}