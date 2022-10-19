import { LayerSettings } from "../InputParameters";

export interface ModelArchitecture {
    buildModel();
    setLayerSettings(layerSettings: LayerSettings);
}