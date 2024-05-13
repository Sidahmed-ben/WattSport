<template >
  <div ref="jitsiContainer" style="height: 1000px; width: 100%;"></div>
</template>

<script>

export default {

  name: "CoachVideoPage",
  props: {
    domain: {
      type: String,
      default: 'myownjitsi.ddns.net'
    },
  },

  data(){
    return{
      option: {
        roomName: "le titre 3emi", // !! C'est interdit de mettre des appostrophe dans le titre.
        width: "100%",
        height: "100%",
        enableWelcomePage: true, 
        chromeExtensionBanner: null,
        userInfo: {displayName: "mon nom"}, // !! C'est interdit de mettre des appostrophe dans le titre.
        configOverwrite: {
         requireDisplayName: false,
         prejoinPageEnabled: false,
         disableDeepLinking: true,
         startWithAudioMuted: false,
        },
        interfaceConfigOverwrite: {MOBILE_APP_PROMO: false, TILE_VIEW_MAX_COLUMNS: 2},
      }
    }
  },

  // MOUNTED 
  mounted () {
    this.loadScript('https://myownjitsi.ddns.net/external_api.js', () => {
      if (!window.JitsiMeetExternalAPI) throw new Error('Jitsi Meet API not loaded');
      this.embedJitsiWidget();
      // this.jitsiApi.isModerationOn(mediaType).then(isModerationOn => {
      //   console.log(" isModerationOn  => ", isModerationOn);
      // });
      // this.executeCommand('addBreakoutRoom',{name: "Hello"});
      // this.executeCommand('subject', 'New Conference Subject');
    });
  },


  // METHODS
  methods: {
    loadScript (src, cb) {
      const scriptEl = document.createElement('script');
      scriptEl.src = src;
      scriptEl.async = 1;
      document.querySelector('head').appendChild(scriptEl);
      scriptEl.addEventListener('load', cb);
    },

    embedJitsiWidget () {
      const options = {
        ...this.option,
        parentNode: this.$refs.jitsiContainer,
      };
      this.jitsiApi = new window.JitsiMeetExternalAPI(this.domain, options);
    },


    executeCommand (command, ...value) {
      this.jitsiApi.executeCommand(command, ...value);
    },
    addEventListener (event, fn) {
      this.jitsiApi.on(event, fn);
    },
    // Misc
    removeJitsiWidget () {
      if (this.jitsiApi) this.jitsiApi.dispose();
    },
  }
};
</script>