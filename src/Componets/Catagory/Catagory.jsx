import { catagoryFullInfos } from "./catagoryFullinfos";
import CatagoryCard from './CatagoryCard';
import classes from "./catagory.module.css";

function Catagory() {
  return (
    <section className={classes.category_container}>
      {catagoryFullInfos.map((infos) => (
        <CatagoryCard key={infos.id} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
