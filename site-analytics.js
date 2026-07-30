(function(){
  const measurementId = "G-Y4BPYDFR29";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const googleTag = document.createElement("script");
  googleTag.async = true;
  googleTag.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.appendChild(googleTag);

  window.h2TrackEvent = function(eventName, parameters){
    window.gtag("event", eventName, parameters || {});
  };

  document.addEventListener("click", function(event){
    const link = event.target.closest("a[href]");
    if(!link) return;

    const href = link.href;
    const commonParameters = {
      link_url: href,
      link_text: link.textContent.trim().slice(0, 100),
      page_path: window.location.pathname
    };

    if(href.includes("line.me/")){
      window.h2TrackEvent("line_reservation_click", commonParameters);
      return;
    }

    if(href.includes("google.com/maps")){
      window.h2TrackEvent("map_navigation_click", commonParameters);
      return;
    }

    if(link.hash === "#plans"){
      window.h2TrackEvent("plan_view_click", commonParameters);
    }
  });
})();
