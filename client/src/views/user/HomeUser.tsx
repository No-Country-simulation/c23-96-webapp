import { useAppStore } from "@/store/useAppStore";
import AcountBalance from "../../components/user/AcountBalance";
import CardsUser from "../../components/user/CardsUser";
import CarrucelOfOfter from "../../components/user/CarrucelOfOfter";
import MovementsList from "../../components/user/MovementsList";

const HomeUser = () => {

  const {isPesos} = useAppStore();
  return (
    <>
      
      <img src={isPesos ? ("/bg.png"): ("bgDolar.png")} className="object-cover flex justify-center" />
      <CardsUser />

      <AcountBalance />

      <CarrucelOfOfter/>

      <MovementsList/>
    </>
  );
};

export default HomeUser;
