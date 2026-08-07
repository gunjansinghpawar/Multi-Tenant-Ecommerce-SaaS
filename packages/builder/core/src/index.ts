export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export interface LayoutProps {
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export interface SpacingProps {
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  gap?: string;
}

export interface TypographyProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecoration?: string;
}

export interface BackgroundProps {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  opacity?: number;
}

export interface BorderProps {
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
}

export interface ConditionRule {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

export interface AnimationProps {
  name?: string;
  duration?: string;
  delay?: string;
  easing?: string;
  iterationCount?: string;
}

export interface BuilderNode {
  id: string;
  type: string;
  parentId: string | null;
  children: string[];
  
  props: Record<string, any>;
  
  styles: {
    layout: ResponsiveValue<LayoutProps>;
    spacing: ResponsiveValue<SpacingProps>;
    typography: ResponsiveValue<TypographyProps>;
    background: ResponsiveValue<BackgroundProps>;
    border: ResponsiveValue<BorderProps>;
    customCSS?: string;
  };
  
  visibility: {
    devices: ('desktop' | 'tablet' | 'mobile')[];
    conditions: ConditionRule[];
  };
  
  animations: AnimationProps;
  metadata: Record<string, any>;
}

export interface BuilderState {
  nodes: Record<string, BuilderNode>;
  rootNodes: string[];
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
}
