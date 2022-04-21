import { useContext } from "react";
import { Bar } from "./components/bar";
import { Force } from "./components/force";
import { ForceList } from "./components/force-list";
import { Load } from "./components/load";
import { LoadList } from "./components/load-list";
import { Moment } from "./components/moment";
import { MomentList } from "./components/moment-list";
import { Sidebar } from "./components/sidebar";
import { Situation } from "./components/situation";
import { Support } from "./components/support";
import { SupportList } from "./components/support-list";
import { SituationContext } from "./context/situation.context";
import { Load as LoadType } from "./types/load";

export const App = () => {
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
    <section className="d-flex h-100 vh-100">
      <Sidebar>
        <Bar onSubmit={(data) => setLength(data.size)} defaultValue={length} />
        <Support
          onSubmit={(data) => addSupport(data.id, data.position, data.type)}
          enabled={length > 0}
          length={length}
        />
        <Force onSubmit={(data) => addForce(data)} enabled={length > 0} />
        <Moment onSubmit={(data) => addMoment(data)} enabled={length > 0} />
        <Load
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
      </Sidebar>
      <div className="vw-100">
        <Situation />
      </div>
      <Sidebar>
        <ForceList forces={forces} onForceRemove={removeForce} />
        <SupportList supports={supports} onSupportRemove={removeSupport} />
        <MomentList moments={moments} onMomentRemove={removeMoment} />
        <LoadList loads={loads} onLoadRemove={removeLoad} />
      </Sidebar>
    </section>
  );
};
