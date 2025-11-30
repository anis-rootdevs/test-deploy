import { getAllShapeLists } from "@/actions/shapeAction/shapeActions";
import { ShapeList } from "./_components/ShapeList";

export default async function ChefShapeHome() {
  const shape = await getAllShapeLists();
  console.log(shape);

  return (
    <div>
      <ShapeList />
    </div>
  );
}
