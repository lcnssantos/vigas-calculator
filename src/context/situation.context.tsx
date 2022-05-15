import { createContext, FunctionComponent, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { Force } from "../types/force";
import { Load } from "../types/load";
import { Moment } from "../types/moment";
import {
  DoubleSupport,
  EmbedSupport,
  SimpleSupport,
  Support,
  SupportType,
} from "../types/support";

interface Situation {
  length: number;
  forces: Array<Force>;
  supports: Array<Support>;
  moments: Array<Moment>;
  loads: Array<Load>;
  positions: Array<number>;
  addSupport: (id: string, position: number, type: SupportType) => void;
  removeSupport: (id: string) => void;
  addForce: (force: Force) => void;
  removeForce: (id: string) => void;
  addMoment: (moment: Moment) => void;
  removeMoment: (id: string) => void;
  setLength: (length: number) => void;
  addLoad: (load: Load) => void;
  removeLoad: (id: string) => void;
}

export const SituationContext = createContext<Situation>({
  length: 0,
  forces: [],
  supports: [],
  moments: [],
  loads: [],
  positions: [],
  addForce: () => {},
  removeForce: () => {},
  removeSupport: () => {},
  setLength: () => {},
  addSupport: () => {},
  addMoment: () => {},
  removeMoment: () => {},
  addLoad: () => {},
  removeLoad: () => {},
});

export const SituationProvider: FunctionComponent = ({ children }) => {
  const [forces, setForces] = useLocalStorageState<Array<Force>>("forces", {
    defaultValue: [],
  });
  const [length, setLength] = useLocalStorageState("length", {
    defaultValue: 0,
  });
  const [supports, setSupports] = useLocalStorageState<Array<Support>>(
    "supports",
    {
      defaultValue: [],
    }
  );

  const [moments, setMoments] = useLocalStorageState<Array<Moment>>("moments", {
    defaultValue: [],
  });

  const [loads, setLoads] = useLocalStorageState<Array<Load>>("loads", {
    defaultValue: [],
  });

  const [positions, setPositions] = useState<Array<number>>([]);

  const removeElementById = (id: string) => {
    removeForce(id);
    removeMoment(id);
    removeLoad(id);
    removeSupport(id);
  };

  const addForce = (force: Force) => {
    removeElementById(force.id);
    setForces([...forces.filter((f) => f.id !== force.id), force]);
  };

  const addSupport = (id: string, position: number, type: SupportType) => {
    const getSupport = () => {
      switch (type) {
        case SupportType.SIMPLE:
          return new SimpleSupport(id, position);
        case SupportType.DOUBLE:
          return new DoubleSupport(id, position);
        case SupportType.EMBED:
          return new EmbedSupport(id, position);
      }
    };

    removeElementById(id);
    setSupports([...supports.filter((s) => s.id !== id), getSupport()]);
  };

  const addMoment = (moment: Moment) => {
    removeElementById(moment.id);
    setMoments([...moments.filter((m) => m.id !== moment.id), moment]);
  };

  const addLoad = (load: Load) => {
    removeElementById(load.id);
    setLoads([...loads.filter((l) => l.id !== load.id), load]);
  };

  const removeMoment = (id: string) => {
    setMoments(moments.filter((m) => m.id !== id));
  };

  const removeForce = (id: string) => {
    setForces(forces.filter((f) => f.id !== id));
  };

  const removeSupport = (id: string) => {
    setSupports(supports.filter((s) => s.id !== id));
  };

  const removeLoad = (id: string) => {
    setLoads(loads.filter((load) => load.id !== id));
  };

  useEffect(() => {
    const newPositions: Array<number> = [0];

    loads.forEach((l) => {
      newPositions.push(l.initialPosition);
      newPositions.push(l.finalPosition);
      l.forces.forEach((f) => newPositions.push(f.position));
    });

    moments.forEach((m) => newPositions.push(m.position));
    forces.forEach((f) => newPositions.push(f.position));
    supports.forEach((s) => newPositions.push(s.position));

    setPositions(newPositions.sort((a, b) => a - b));
  }, [loads, moments, forces, supports]);

  return (
    <SituationContext.Provider
      value={{
        forces,
        length,
        positions,
        addForce,
        removeForce,
        removeSupport,
        setLength,
        addSupport,
        supports,
        addMoment,
        removeMoment,
        moments,
        addLoad,
        loads,
        removeLoad,
      }}
    >
      {children}
    </SituationContext.Provider>
  );
};
