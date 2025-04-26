'use client'

import { SalesChartAreaInteractive } from "@/components/common/sales-chart-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, PlusIcon } from "lucide-react";

export default function Dashboard() {
  
  return (
    <main className="space-y-3">

      <section className="flex justify-between flex-col gap-2 lg:flex-row lg:items-center">
        <SectionHeading heading={"Overview"} />
        <div className="flex gap-3">
          <Button size={'sm'} variant={'outline'}>
            Manage Stock
          </Button>
          <Button size={'sm'} variant={'outline'}>
            View Orders
          </Button>
          <Button size={'sm'}>
            <PlusIcon />
            Add New Product
          </Button>
        </div>
      </section>

      {/* Stats Card Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <p>₹ 1,250.00</p>
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card border-green-500 ">
          <CardHeader className="relative">
            <CardDescription>New Orders</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              -1,234
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingDownIcon className="size-3" />
                -20%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period <TrendingDownIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card border-orange-500 ">
          <CardHeader className="relative">
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              45,678
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              4.5%
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +4.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Meets growth projections</div>
          </CardFooter>
        </Card>
      </section>
      
      {/* Sales section */}
      <section>
        <SalesChartAreaInteractive />
      </section>

      {/* Miscellaneous cards section */}
      <section className="flex gap-3">
        {[
          {
            heading: 'Products',
            description: 'Total no. of products',
            value: '30',
          },
          {
            heading: 'New Customers',
            description: 'In last 7 Days.',
            value: '30',
          },
        ].map((item, index) => (
          <Card key={index} className="flex-1">
            <CardHeader>
              <CardTitle>{item.heading}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="">
              <p className="text-2xl">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <SectionHeading heading="Recent activity" />

      {/* Latest orders section */}
      <section>
        <p>Latest Orders</p>
      </section>

    </main>
  )
}

const SectionHeading = ({ heading }: { heading: string }) => <h1 className="text-2xl font-bold font-secondary">{heading}</h1>

