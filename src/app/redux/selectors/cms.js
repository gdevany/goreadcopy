export const getEntity = (cms, key) => cms[key] || {};

export const getSection = (cms, page, section) => (
  Object.keys(cms).reduce((acc, key) => {
    const isPartOfSection = key.includes(`${page}.${section}`);

    return isPartOfSection ? [...acc, cms[key]] : [...acc];
  }, [])
);
