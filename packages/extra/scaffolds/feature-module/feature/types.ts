export interface FeatureModel {
  title: string;
  description: string;
  status: string;
}

export interface FeatureConfig {
  featureData: FeatureModel;
}

export type RawFeaturePayload = Record<string, unknown> & {
  title?: string | null;
  description?: string | null;
  status?: string | null;
};
