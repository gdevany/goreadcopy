/*
  Make this loader namespace and separate styles using this.options
  it should namespace each file that starts with includes [styleFramework]
  also should namespace files that arte whitelisted in options with
  rules=[
  {
    query: 'bootstrap',
    className: 'BoostrapCSS',
  }
] or use file.[styleFramework].css

  We can even try just to create two index files one called index.foundation.scss and index.bootstrap.scss
  Ticket: GOR-35
*/

module.exports = function namespaceSassLoader(source) {
  const isBootstrap = this.resource.includes('bootstrap');

  if (isBootstrap) {
    return ('.BootstrapCSS {' + source + '}');
  }

  return (source);
};
