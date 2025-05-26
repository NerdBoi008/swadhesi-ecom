import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@repo/types";

interface ProductViewDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductViewDialog: React.FC<ProductViewDialogProps> = ({
  product,
  isOpen,
  onOpenChange,
}) => {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] flex flex-col p-0">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-lg sm:text-xl font-bold truncate">
            {product.name}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {product.category?.name || "Product Details"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Product Images */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Images
                </h4>
                {product.thumbnail_image_url && (
                  <div className="relative aspect-square w-full max-w-48 rounded-lg overflow-hidden border bg-muted">
                    <Image
                      src={product.thumbnail_image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {product.images_url && product.images_url.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images_url.slice(0, 8).map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border bg-muted"
                      >
                        <Image
                          src={url}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                    Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{product.category?.name || "N/A"}</span>
                    </div>
                    <div>
                      <span className="font-medium">Slug:</span>
                      <span className="ml-2 font-mono text-xs bg-muted px-1 py-0.5 rounded">
                        {product.slug || "N/A"}
                      </span>
                    </div>
                  </div>
                  
                  {product.description && (
                    <div className="mt-3">
                      <span className="font-medium text-sm">Description:</span>
                      <div 
                        className="mt-1 text-sm text-muted-foreground line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </div>
                  )}
                </div>

                {/* Meta Info */}
                {(product.meta_title || product.meta_description) && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      SEO Meta
                    </h4>
                    <div className="space-y-2 text-sm">
                      {product.meta_title && (
                        <div>
                          <span className="font-medium">Title:</span>
                          <span className="ml-2 text-muted-foreground">{product.meta_title}</span>
                        </div>
                      )}
                      {product.meta_description && (
                        <div>
                          <span className="font-medium">Description:</span>
                          <span className="ml-2 text-muted-foreground line-clamp-2">
                            {product.meta_description}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Attributes */}
                {product.attributes && product.attributes.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      Attributes
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {product.attributes.map((attr) => (
                        <Badge key={attr.attribute_id} variant="secondary" className="text-xs">
                          {attr.attribute.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Variants Section */}
            {product.variants && product.variants.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                    Variants ({product.variants.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {product.variants.map((variant) => (
                      <Card key={variant.id} className="p-3">
                        <CardContent className="p-0 space-y-2">
                          {/* Variant Header */}
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">
                                SKU: {variant.sku}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-lg">
                                  ${variant.price}
                                </span>
                                {variant.sale_price !== null && (
                                  <span className="text-sm text-red-500 line-through">
                                    ${variant.sale_price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Variant Details */}
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            {variant.image_url && (
                              <div className="relative w-12 h-12 rounded-md overflow-hidden border bg-muted flex-shrink-0">
                                <Image
                                  src={variant.image_url}
                                  alt={`Variant ${variant.sku}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>

                            <div>
                              <span className="font-medium">Stock:</span>
                              <span className="ml-1">{variant.stock}</span>
                            </div>
                            {variant.size && (
                              <div>
                                <span className="font-medium">Size:</span>
                                <span className="ml-1">{String(variant.size)}</span>
                              </div>
                            )}
                            {variant.barcode && (
                              <div className="col-span-2">
                                <span className="font-medium">Barcode:</span>
                                <span className="ml-1 font-mono">{variant.barcode}</span>
                              </div>
                            )}
                            </div>
                          </div>

                          {/* Attribute Values */}
                          {variant.attribute_values && variant.attribute_values.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {variant.attribute_values.map((attValue) => (
                                <Badge key={attValue.id} variant="outline" className="text-xs px-1.5 py-0.5">
                                  {attValue.value}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};