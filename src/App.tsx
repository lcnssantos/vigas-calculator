import {useContext} from "react";
import {BarForm} from "./components/forms/bar.form";
import {ForceForm} from "./components/forms/force.form";
import {ForceList} from "./components/list/force.list";
import {LoadForm} from "./components/forms/load.form";
import {LoadList} from "./components/list/load.list";
import {MomentForm} from "./components/forms/moment.form";
import {MomentList} from "./components/list/moment.list";
import {Sidebar} from "./components/sidebar";
import {Situation} from "./components/situation";
import {SupportForm} from "./components/forms/support.form";
import {SupportList} from "./components/list/support.list";
import {SituationContext} from "./context/situation.context";
import {Load as LoadType} from "./types/load";
import RightSideBar from "./components/sidebars/RightSideBar";

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
            <RightSideBar title={'Formulário de Forças'}>
                <BarForm onSubmit={(data) => setLength(data.size)} defaultValue={length}/>
                <SupportForm
                    onSubmit={(data) => addSupport(data.id, data.position, data.type)}
                    enabled={length > 0}
                    length={length}
                />
                <ForceForm onSubmit={(data) => addForce(data)} enabled={length > 0}/>
                <MomentForm onSubmit={(data) => addMoment(data)} enabled={length > 0}/>
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
            </RightSideBar>

            <div className="vw-100">
                <Situation/>
            </div>
            <Sidebar>
                <ForceList forces={forces} onRemove={removeForce}/>
                <SupportList supports={supports} onRemove={removeSupport}/>
                <MomentList moments={moments} onRemove={removeMoment}/>
                <LoadList loads={loads} remove={removeLoad}/>
            </Sidebar>
        </section>
    );
};
