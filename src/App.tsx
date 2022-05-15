import React, { useContext, useLayoutEffect, useState } from "react";
import Content from "./components/content";
import { BarForm } from "./components/forms/bar.form";
import { ForceForm } from "./components/forms/force.form";
import { LoadForm } from "./components/forms/load.form";
import { MomentForm } from "./components/forms/moment.form";
import { SupportForm } from "./components/forms/support.form";
import LeftSidebar from "./components/left.sidebar";
import { ForceList } from "./components/list/force.list";
import { LoadList } from "./components/list/load.list";
import { MomentList } from "./components/list/moment.list";
import { SupportList } from "./components/list/support.list";
import RightSidebar from "./components/right.sidebar";
import { SituationContext } from "./context/situation.context";
import { Load as LoadType } from "./types/load";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const App = () => {
  const [width] = useWindowSize();

  const {
    setLength,
    addForce,
    forces,
    removeForce,
    length,
    removeSupport,
    supports,
    addSupport,
    addMoment,
    moments,
    removeMoment,
    addLoad,
    loads,
    removeLoad,
  } = useContext(SituationContext);

  return (
    <section className="d-flex h-100 vh-100" style={{ transition: "all 1s" }}>
      <LeftSidebar title={"Defina as forças, apoios e momentos"}>
        <BarForm
          onSubmit={(data) => setLength(data.size)}
          defaultValue={length}
        />
        <SupportForm
          onSubmit={(data) => addSupport(data.id, data.position, data.type)}
          enabled={length > 0}
          length={length}
        />
        <ForceForm onSubmit={(data) => addForce(data)} enabled={length > 0} />
        <MomentForm onSubmit={(data) => addMoment(data)} enabled={length > 0} />
        <LoadForm
          onSubmit={(data) =>
            addLoad(
              new LoadType(
                data.id,
                data.initialValue,
                data.finalValue,
                data.initialPosition,
                data.finalPosition
              )
            )
          }
          enabled={length > 0}
        />
      </LeftSidebar>

      <main
        className="d-flex w-100 position-relative justify-content-center"
        style={{ transition: "all 0.5s ease-in" }}
      >
        <Content width={width} />
        <RightSidebar title={"Cargas e Reações"} width={width}>
          <ForceList forces={forces} onRemove={removeForce} />
          <SupportList supports={supports} onRemove={removeSupport} />
          <MomentList moments={moments} onRemove={removeMoment} />
          <LoadList loads={loads} remove={removeLoad} />
        </RightSidebar>
      </main>
    </section>
  );
};

export default App;
