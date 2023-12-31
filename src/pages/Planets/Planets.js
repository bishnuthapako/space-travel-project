import {useState, useEffect, useContext} from "react";

import styles from "./Planets.module.css";
import {LoadingContext} from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Planets ()
{
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const {isLoading, enableLoading, disableLoading} = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  console.log(selectedSpacecraftId, "selectedSpacecraftId")
  async function getPlanetsWithSpacecrafts ()
  {
    const {data: planets, isError: isErrorPlanets} = await SpaceTravelApi.getPlanets();
    const {data: spacecrafts, isError: isErrorSpacecrafts} = await SpaceTravelApi.getSpacecrafts();
  

    if (!isErrorPlanets && !isErrorSpacecrafts)
    {
      const planetsWithTheirSpacecrafts = planets.map((planet)=>{
      
        return {
          ...planet,
          spacecrafts: spacecrafts.filter((spacecraft)=> spacecraft.currentLocation === planet.id)
        }
      })
      console.log(planetsWithTheirSpacecrafts, 'planetsWithTheirSpacecrafts')
      // todo fill planets.spacecrafts with spacecrafts
      setPlanetsWithSpacecrafts(planetsWithTheirSpacecrafts);

    }
  }


  useEffect(() =>
            {
              async function runGetPlanetsWithSpacecrafts ()
              {
                enableLoading();
                await getPlanetsWithSpacecrafts();
                disableLoading();
              }

              runGetPlanetsWithSpacecrafts();
            },
            [enableLoading, disableLoading]
  );

  function handleClickOfPlanet (event, id)
  {
    // todo set the selected planet
    if(!isLoading){
      setSelectedPlanetId(id)
    }
  }

  async function handleClickOfSpacecraft (event, spacecraftId, planetId)
  {
    enableLoading()
    console.log(spacecraftId, planetId, selectedPlanetId)
    setSelectedSpacecraftId(spacecraftId)

    if (selectedPlanetId !== planetId) {
      console.log("HITTING....")
      const { isError, data } = await SpaceTravelApi.sendSpacecraftToPlanet({spacecraftId, targetPlanetId: selectedPlanetId});
      console.log("RS", isError, data)
      if(!isError){
        getPlanetsWithSpacecrafts();
        setSelectedPlanetId(null)
        setSelectedSpacecraftId(null)
      }
      disableLoading()
    }

    // todo set the selected spacecraft
    // todo send spacecraft to planet using the API
    // todo call getPlanetsWithSpacecrafts to refresh the page content
    

  // if(!isLoading && Number.isInteger(selectedPlanetId) && selectedPlanetId !== planetId){
  //   setSelectedSpacecraftId(spacecraftId);
  //   enableLoading()
  //   const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({spacecraftId, targetPlanetId: selectedPlanetId});
  //   if(!isError){
  //     getPlanetsWithSpacecrafts();
  //     setSelectedPlanetId(null)
  //     setSelectedSpacecraftId(null)
  //   }
  //   disableLoading()
  // }

  }

  return (
    <>
      {
        planetsWithSpacecrafts.map(
          (planet, index) =>
            <div
              key={index}
              className={styles["planetWithSpacecrafts"]}
            >
              <div
                className={`${styles["planet"]} ${selectedPlanetId === planet.id && styles["planet--selected"]}`}
                onClick={(event) => handleClickOfPlanet(event, planet.id)}
              >
                <div className={styles["planet__imageContainer"]}>
                  <img
                    src={planet.pictureUrl}
                    alt={`The planet ${planet.name}`}
                    className={styles["planet__image"]}
                  />
                </div>

                <div className={styles["planet__info"]}>
                  <div>{planet.name}</div>
                  <div>{planet.currentPopulation}</div>
                </div>
              </div>

              <div className={styles["planet__spacecrafts"]}>
                {
                  planet.spacecrafts.map((spacecraft, index) =>
                                           <div
                                             key={index}
                                             className={`${styles["planet__spacecraft"]} ${selectedSpacecraftId === spacecraft.id && styles["planet__spacecraft--selected"]}`}
                                             onClick={(event) => handleClickOfSpacecraft(event, spacecraft.id, planet.id)}
                                           >
                                             <div className={styles["planet__spacecraft__imageContainer"]}>
                                               {
                                                 spacecraft.pictureUrl
                                                 ?
                                                 <img
                                                   src={spacecraft.pictureUrl}
                                                   alt={`The spacecraft ${spacecraft.name}`}
                                                   className={styles["planet__spacecraft__image"]}
                                                 />
                                                 :
                                                 <span className={styles["planet__spacecraft__image--default"]}>🚀</span>
                                               }

                                             </div>
                                             <div className={"planet__spacecraft__info"}>
                                               <div>{spacecraft.name}</div>
                                               <div>{spacecraft.capacity}</div>
                                             </div>
                                           </div>
                  )
                }
              </div>
            </div>
        )
      }
    </>
  );
}

export default Planets;
