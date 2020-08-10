import { inject, observer } from "mobx-react";
import compose from "lodash/fp/compose";

const mobxify = (...stores) => compose(inject(...stores), observer);

export default mobxify;
