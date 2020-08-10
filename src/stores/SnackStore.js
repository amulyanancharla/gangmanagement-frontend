import { decorate, observable, action } from "mobx";

class SnackStore {
  message = null;
  open = false;
  severity = "info";

  show({ message, time = 5000, severity = "info" }) {
    this.message = message;
    this.open = true;
    this.severity = severity;

    setTimeout(() => {
      this.hide();
    }, time);
  }

  hide() {
    this.open = false;
    this.message = null;
    this.severity = "info";
  }
}

decorate(SnackStore, {
  message: observable,
  open: observable,
  severity: observable,
  show: action,
  hide: action,
});

const snackStore = new SnackStore();
export default snackStore;
