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
      const lineParameters = {
        ...commonParameters,
        line_source: link.dataset.lineSource || "unspecified"
      };
      window.h2TrackEvent("line_reservation_click", lineParameters);

      if(link.dataset.therapistId){
        window.h2TrackEvent("therapist_reservation_click", {
          ...lineParameters,
          therapist_id: link.dataset.therapistId,
          therapist_name: link.dataset.therapistName || ""
        });
      }

      if(link.dataset.recruitmentClick === "true"){
        window.h2TrackEvent("recruitment_click", lineParameters);
      }
      return;
    }

    if(href.includes("google.com/maps")){
      window.h2TrackEvent("map_navigation_click", {
        ...commonParameters,
        map_source: link.dataset.mapSource || "unspecified"
      });
      return;
    }

    if(link.hash === "#plans"){
      window.h2TrackEvent("plan_view_click", commonParameters);
    }
  });
})();
