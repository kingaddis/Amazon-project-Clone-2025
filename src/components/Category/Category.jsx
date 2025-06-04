import { catagoryFullInfos } from "./catagoryFullinfos";
import CatagoryCard from './CategoryCard';
import classes from "./category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {catagoryFullInfos.map((infos) => (
        <CatagoryCard key={infos.id} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
