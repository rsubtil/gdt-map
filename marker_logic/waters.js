// Simple
// Just a simple group of collectibles, trackable in the sidebar

function addWaters(map) {

    // New layer with id `waters` from geoJSON `waters`
    map.addInteractiveLayer('waters', waters, {

        // The display name for this layer
        name: 'Águas',

        // This layer should have a tab in the sidebar with a list for each feature ID
        create_checkbox: true,

        // Each feature should have a popup
        // This internally calls `getPopupMedia()` to associate an image or video
        // See `map_utils.js` for an example
        create_feature_popup: true,

        // This layer should be visible by default
        is_default: true,

        // Let's do something on every feature
        // https://leafletjs.com/reference.html#geojson-oneachfeature
        onEachFeature: function (feature, layer) {

            // Listen for events and do something
            // https://leafletjs.com/reference.html#evented-on
            layer.on({

                // Do some fancy highlighting by hovering with the mouse
                mouseover: event => {
                    this.highlightFeature(feature.properties.id);
                },
                mouseout: event => {
                    this.removeFeatureHighlight(feature.properties.id);
                },

                // Clicking on the layer zooms to it
                click: event => {

                    // This layer gets a popup which also does some additional stuff…
                    this.zoomToFeature(feature.properties.id);

                    // …which can be manually included if no popup is generated:
                    // map.share_marker.prevent();
                    // Utils.setHistoryState(this.id, feature.properties.id);
                }
            });

            // Bind a tooltip which follows the mouse around when hovering over a feature that
            // isn't a point (marker)
            if (feature.geometry.type != "Point") {

                // https://leafletjs.com/reference.html#layer-bindtooltip
                layer.bindTooltip(feature.properties.name, {
                    sticky: true
                });
            }
        },

        // We don't have created a custom icon so let's use a generic one from Font Awesome
        // Omitting this uses the group icon in `images/icons/${this.id}.png` by default
        // This needs a html string or a function that return a html string
        sidebar_icon_html: '<i class="fas fa-water"></i>',

        // We don't have created a custom icon so we have to manually provide a marker
        // Omitting this sets a marker with the group icon in `images/icons/${this.id}.png` by default
        // This can include logic based on feature properties
        // https://leafletjs.com/reference.html#geojson-pointtolayer
        pointToLayer: function (feature, latlng) {
            var feature_type = feature.properties.id.split('-')[2];
            var icon;
            switch (feature_type) {
                case 'rio':
                case 'ribeira':
                case 'regato':
                case 'riacho':
                    icon = 'fa-water';
                    break;
                case 'foz':
                case 'estuario':
                    icon = 'fa-anchor';
                    break;
                case 'fonte':
                case 'cataratas':
                    icon = 'fa-faucet';
                    break;
                case 'lago':
                case 'lagoa':
                    icon = 'fa-water';
                    break;
                case 'cabo':
                    icon = 'fa-camera';
                    break;
                case 'poca':
                case 'charco':
                    icon = 'fa-droplet';
                    break;
                default:
                    icon = 'fa-water';
                    break;
            }
            // https://leafletjs.com/reference.html#marker
            return L.marker(latlng, {

                // We don't have created a custom icon so let's use a generic one from Font Awesome
                // This can take:
                // * a Font Awesome `fa-` string
                // * the group id (`this.id`) to take the `images/icons/${this.id}.png`
                // * a max 2 char long string
                // * nothing for a generic marker
                icon: Utils.getCustomIcon(icon, "waters"),
                riseOnHover: true
            });
        },

        // Give polygons some special styling
        // Function that return a path object or directly a path object
        // https://leafletjs.com/reference.html#geojson-style
        // https://leafletjs.com/reference.html#path-option
        polygon_style: function (feature) {
            return {
                color: "blue",
                opacity: 0.9,
                lineJoin: "round",
                weight: 7
            };
        },
    });
}
