import variable from './../variables/platform';

export default (variables = variable) => {
  const h2Theme = {
    color: variables.brandPimary,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
    paddingBottom: 12
  };

  return h2Theme;
};
