import React, { FC, Children, cloneElement } from "react";
import LoadingWrapperWidget, {
  LoadingWrapperWidgetProps,
} from "./LoadingWrapperWidget";

export interface LoadingWrapperProps extends LoadingWrapperWidgetProps {
  loading: boolean;
  children: any;
}

const LoadingWrapper: FC<LoadingWrapperProps> = ({
  circle,
  loading,
  children,
}) => {
  const updateChild = loading
    ? Children.map(children, (child, i) => {
        return cloneElement(child as any, { disabled: true });
      })
    : children;
  return (
    <div className="relative inline-block">
      {loading && <LoadingWrapperWidget circle={circle} />}
      {updateChild}
    </div>
  );
};

export default LoadingWrapper;
