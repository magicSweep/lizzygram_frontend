import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { compose, set, tap, elif } from "fmagic";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default {
  component: Box,
  title: "Test/ReactAndFunc",
};

type StateData = {
  count: number;
  isCool: boolean;
  isEven: boolean;
};

/* type FullStateData = {
    state: StateData,
    setState: Dispatch<SetStateAction<StateData>>
} */

type RefData = {
  secret: string;
  blue: string;
};

type MainData = OtherData & {
  state: StateData;
  setState: Dispatch<SetStateAction<StateData>>;
  mainRef: MutableRefObject<RefData>;
};

type OtherData = {
  clickHandler: () => void;
};

const useReactAndFunc_ = (useState: any, useEffect: any, useRef: any) =>
  compose<any, any>(
    // ADD USE STATE
    (data: MainData) => {
      const [state, setState] = useState({
        count: 0,
        isCool: true,
        isEven: false,
      });

      return {
        state,
        setState,
      };
    },
    // ADD MAIN REF
    (data: MainData) => ({
      ...data,
      mainRef: useRef({
        secret: "super_secret",
        blue: "red",
      }),
    }),
    /* set(
      "mainRef",
      useRef({
        secret: "super_secret",
        blue: "red",
      })
    ) */
    tap((data: MainData) =>
      useEffect(() => {
        console.log("USE EFFECT START", data);
      }, [])
    ),
    tap((data: MainData) =>
      useEffect(
        compose(
          tap(() => console.log("USE EFFECT EVEN COUNT", data.state.count % 2)),
          elif(
            () => data.state.count !== 0 && data.state.count % 2 === 0,
            () => data.setState((state: any) => ({ ...state, isEven: true })),
            () => data.setState((state: any) => ({ ...state, isEven: false }))
          )
        ),
        [data.state.count]
      )
    ),
    (data: MainData) => ({
      ...data,
      clickHandler: () => console.log(data.state.count),
    })
  );

const useReactAndFuncMap_ = (useState: any, useEffect: any, useRef: any) =>
  compose<any, any>(
    // ADD USE STATE
    (data: MainData) => {
      const [state, setState] = useState({
        count: 0,
        isCool: true,
        isEven: false,
      });

      return {
        state,
        setState,
      };
    },
    // ADD MAIN REF
    (data: MainData) => ({
      ...data,
      mainRef: useRef({
        secret: "super_secret",
        blue: "red",
      }),
    }),
    /* set(
      "mainRef",
      useRef({
        secret: "super_secret",
        blue: "red",
      })
    ) */
    tap((data: MainData) =>
      useEffect(() => {
        console.log("USE EFFECT START", data);
      }, [])
    ),
    tap((data: MainData) =>
      useEffect(
        compose(
          tap(() => console.log("USE EFFECT EVEN COUNT", data.state.count % 2)),
          elif(
            () => data.state.count !== 0 && data.state.count % 2 === 0,
            () => data.setState((state: any) => ({ ...state, isEven: true })),
            () => data.setState((state: any) => ({ ...state, isEven: false }))
          )
        ),
        [data.state.count]
      )
    ),
    (data: MainData) => ({
      ...data,
      clickHandler: () => console.log(data.state.count),
    })
  );

const useReactAndFunc = useReactAndFunc_(useState, useEffect, useRef);

const ReactAndFunc = compose<any, JSX.Element>(
  (props: any) => ({
    ...props,
    ...useReactAndFunc(),
  }),
  (data: any) => {
    return (
      <div>
        <h1 className="text-center">Hello.</h1>
        <div>
          <p className="w-3/4 m-auto p-4">{JSON.stringify(data.state)}</p>
          <p className="w-3/4 m-auto p-4">
            {JSON.stringify(data.mainRef.current)}
          </p>
          <Button
            onClick={() =>
              data.setState((state: any) => ({
                ...state,
                count: state.count + 1,
              }))
            }
          >
            Change count
          </Button>

          <Button
            onClick={() =>
              data.setState((state: any) => ({
                ...state,
                isCool: !state.isCool,
              }))
            }
          >
            Toggle cool
          </Button>

          {useMemo(
            () => (
              <Button onClick={data.clickHandler}>Show count</Button>
            ),
            [data.state.count]
          )}
        </div>
      </div>
    );
  }
);

export const Default = () => {
  return <ReactAndFunc />;
};
