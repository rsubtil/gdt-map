// Simple
// Just a simple group of collectibles, trackable in the sidebar

function addBiomes(map) {

    // New layer with id `biomes` from geoJSON `biomes`
    map.addInteractiveLayer('biomes', biomes, {

        // The display name for this layer
        name: 'Biomas',

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
        sidebar_icon_html: '<i class="fas fa-seedling"></i>',

        // We don't have created a custom icon so we have to manually provide a marker
        // Omitting this sets a marker with the group icon in `images/icons/${this.id}.png` by default
        // This can include logic based on feature properties
        // https://leafletjs.com/reference.html#geojson-pointtolayer
        pointToLayer: function (feature, latlng) {
            var feature_type = feature.properties.id.split('-')[2];
            var icon;
            switch (feature_type) {
                case "planicie":
                case "planalto":
                    icon = 'fa-seedling';
                    break;
                case "floresta":
                case "bosque":
                case "mata":
                case "taiga":
                case "selva":
                    icon = 'fa-tree';
                    break;
                case "pantano":
                case "mangue":
                    icon = 'fa-frog';
                    break;
                case "praia":
                    icon = 'fa-umbrella-beach';
                    break;
                case "deserto":
                case "mesa":
                    icon = 'fa-sun';
                    break;
                case "savana":
                case "mato":
                    icon = "fa-plant-wilt"
                    break;
                case "glaciar":
                    icon = 'fa-igloo';
                    break;
                default:
                    icon = 'fa-seedling';
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
                icon: Utils.getCustomIcon(icon, "biomes"),
                riseOnHover: true
            });
        },
    });
}
