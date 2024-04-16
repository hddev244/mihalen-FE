import { Card, Skeleton } from "@nextui-org/react";


function CardProductItemLoading() {
    return (
    <div className="aspect-[5/6] space-y-5 border p-4">
      <Skeleton className="rounded-lg h-1/2">
        <div className=" h-fullrounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 h-1/2">
        <Skeleton className="w-3/5  rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5  rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
    );
}

export default CardProductItemLoading;