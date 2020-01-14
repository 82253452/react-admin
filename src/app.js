import React from 'react';

const containers = require.context('@/hookModels');

function compose() {
  return function Component(props) {
    return containers
      .keys()
      .map(e => containers(e).default)
      .reduceRight(
        (child, Container) => <Container.Provider>{child}</Container.Provider>,
        props.children,
      );
  };
}

export function rootContainer(container) {
  const Provider = compose();
  return React.createElement(Provider, null, container);
}
