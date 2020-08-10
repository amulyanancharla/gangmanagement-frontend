import { decorate, observable, action, computed } from "mobx";
import decode from "jwt-decode";

class AuthStore {
  agentJwt = localStorage.getItem("agent_jwt");
  agentRefreshToken = localStorage.getItem("agent_refresh_token");
  platformJwt = localStorage.getItem("platform_jwt");
  platformRefreshToken = localStorage.getItem("platform_refresh_token");

  agentLogin({ jwt, refresh_token }) {
    this.agentJwt = jwt;
    this.agentRefreshToken = refresh_token;
    localStorage.setItem("agent_jwt", jwt);
    localStorage.setItem("agent_refresh_token", refresh_token);
  }

  agentLogout() {
    this.agentJwt = null;
    this.agentRefreshToken = null;
    localStorage.removeItem("agent_jwt");
    localStorage.removeItem("agent_refresh_token");
  }

  platformLogin({ jwt, refresh_token }) {
    this.platformJwt = jwt;
    this.platformRefreshToken = refresh_token;
    localStorage.setItem("platform_jwt", jwt);
    localStorage.setItem("platform_refresh_token", refresh_token);
  }

  platformLogout() {
    this.platformJwt = null;
    this.platformRefreshToken = null;
    localStorage.removeItem("platform_jwt");
    localStorage.removeItem("platform_refresh_token");
  }

  get isAgentLoggedIn() {
    return this.agentJwt !== null;
  }

  get agencyInfo() {
    return decode(this.agentJwt);
  }

  get isPlatformLoggedIn() {
    return this.platformJwt !== null;
  }
}

decorate(AuthStore, {
  agentJwt: observable,
  agentRefreshToken: observable,
  agentLogin: action,
  agentLogout: action,
  isAgentLoggedIn: computed,
  platformJwt: observable,
  platformRefreshToken: observable,
  platformLogin: action,
  platformLogout: action,
  isPlatformLoggedIn: computed,
  agencyInfo: computed,
});

export default new AuthStore();
