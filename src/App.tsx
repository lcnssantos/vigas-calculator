import React, {useContext, useLayoutEffect, useState} from "react";
import {BarForm} from "./components/forms/bar.form";
import {ForceForm} from "./components/forms/force.form";
import {ForceList} from "./components/list/force.list";
import {LoadForm} from "./components/forms/load.form";
import {LoadList} from "./components/list/load.list";
import {MomentForm} from "./components/forms/moment.form";
import {MomentList} from "./components/list/moment.list";
import {SupportForm} from "./components/forms/support.form";
import {SupportList} from "./components/list/support.list";
import {SituationContext} from "./context/situation.context";
import {Load as LoadType} from "./types/load";
import LeftSidebar from "./components/left.sidebar";
import RightSidebar from "./components/right.sidebar";
import {SupportReaction} from "./utils/supportReaction";
import Content from "./components/content";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
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
        removeLoad
    } = useContext(SituationContext);

    const formula = SupportReaction.getSupportReaction(forces, supports, loads);

    return (
        <section className="d-flex h-100 vh-100" style={{transition: 'all 1s'}}>
            <LeftSidebar title={'Defina as forças, apoios e momentos'}>
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
            </LeftSidebar>

            <main className="d-flex w-100 position-relative">
                <Content formula={formula} width={width}/>
                <RightSidebar title={'Cargas e Reações'} width={width}>
                    <ForceList forces={forces} onRemove={removeForce}/>
                    <SupportList supports={supports} onRemove={removeSupport}/>
                    <MomentList moments={moments} onRemove={removeMoment}/>
                    <LoadList loads={loads} remove={removeLoad}/>
                </RightSidebar>
            </main>
        </section>
    );
};

export default App
