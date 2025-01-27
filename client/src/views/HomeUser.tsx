import AcountBalance from "../components/user/AcountBalance";
import CardsUser from "../components/user/CardsUser";
import CarrucelOfOfter from "../components/user/CarrucelOfOfter";
import MovementsList from "../components/user/MovementsList";

const HomeUser = () => {

 
  return (
    <>
      <img src="/bg.png" className="object-cover" />
      <CardsUser />

      <AcountBalance />

      <CarrucelOfOfter/>

      <MovementsList/>
    </>
  );
};

export default HomeUser;
