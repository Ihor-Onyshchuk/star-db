import React from "react";
import { SwapiServiceConsumer } from "../SwapiServiceContext/SwapiServiceContext";

const withSwapiService = mapMethodsToProps => Wrapped => {
  return props => {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          const serviceProps = mapMethodsToProps(swapiService);
          if (mapMethodsToProps) {
            return <Wrapped {...props} {...serviceProps} />;
          }
          return <Wrapped {...props} swapiService={swapiService} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};

export default withSwapiService;
