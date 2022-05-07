import { createContext, FunctionComponent, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { MathCalc } from "../math";
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
  decodedForces: Array<Force>;
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
  sumOfYForces: (forces: Array<Force>, supports: Array<Support>) => void;
}

export const SituationContext = createContext<Situation>({
  forces: [],
  decodedForces: [],
  length: 0,
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
  sumOfYForces: () => {}
});

export const SituationProvider: FunctionComponent = ({ children }) => {

  const sumOfYForces = (forces: Array<Force>, supports: Array<Support>) => {
        let forceResult: number = 0;
        let supportNumber: number = 0;
        let supportReaction: number = 0;

        forces.forEach((force) => {
          forceResult += force.intensity || 0;
        });

        supports.forEach(() => {
          supportNumber += 1;
        });

        if (supportNumber > 0) {
          supportReaction = forceResult / supportNumber

          supports.forEach((s) => {
            s.forces.map((f) => {
              if (f.id = 'y') {
                f.intensity = supportReaction;
              }
            });
          });
        }
  }

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

  const [decodedForces, setDecodedForces] = useState<Array<Force>>([]);
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

  const getDecodedForces = (forces: Array<Force>) =>
    forces
      .map((force) => {
        if ([0, 90, 180, 270].includes(force.angle)) {
          return [];
        }
        const { fx, fy } = MathCalc.decodeForce(force);
        return [fx, fy];
      })
      .reduce((out, forceList) => [...out, ...forceList], []);

  useEffect(() => {
    setDecodedForces([
      ...getDecodedForces(forces),
      ...supports.map((s) => s.forces).reduce((o, f) => [...o, ...f], []),
      ...loads.map((l) => l.resultForces).reduce((o, f) => [...o, ...f], []),
    ]);
  }, [forces, supports, loads, moments]);

  useEffect(() => {
    const newPositions: Array<number> = [0];

    loads.forEach((l) => {
      newPositions.push(l.initialPosition);
      newPositions.push(l.finalPosition);
      l.resultForces.forEach((f) => newPositions.push(f.position));
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
        decodedForces,
        addSupport,
        supports,
        addMoment,
        removeMoment,
        moments,
        addLoad,
        loads,
        removeLoad,
        sumOfYForces
      }}
    >
      {children}
    </SituationContext.Provider>
  );
};
