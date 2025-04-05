import { colors } from "@/styles";
import { useMemo } from "react";
import { type DimensionValue, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Defs,
  LinearGradient,
  type NumberProp,
  Path,
  Stop,
  Svg,
  Text,
} from "react-native-svg";
import { Text as TextUI } from "../ui";
import { buildAreaPath, buildLinePath, formatNumber } from "./utils";

interface LineChartProps {
  x: number[];
  y: number[];
  y2?: number[];
  width?: DimensionValue;
  height: NumberProp;
  subtitles?: {
    y: string;
    y2?: string;
  };
}

const POINT_GAP = 30; // Cada ponto no X

const MARGIN_TOP = 10; // Espaço p/ o tick de valor máximo
const MARGIN_LEFT = 30; // Espaço p/ ticks no eixo Y
const MARGIN_BOTTOM = 20; // Espaço p/ ticks no eixo X

export function LineChart({
  x,
  y,
  y2,
  width = "100%",
  height,
  subtitles,
}: LineChartProps) {
  const allY = [...y, ...(y2 || [])];

  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const chartWidth = x.length * POINT_GAP;
  const chartInnerHeight = Number(height) - MARGIN_BOTTOM - MARGIN_TOP;

  function getXCoord(i: number) {
    return MARGIN_LEFT + i * POINT_GAP;
  }

  function getYCoord(val: number) {
    const ratio = (val - minY) / (maxY - minY || 1);

    const yCoord = chartInnerHeight - ratio * chartInnerHeight;

    return MARGIN_TOP + yCoord;
  }

  const ticksY = useMemo(() => {
    const numYTicks = 5;

    const ticksY: number[] = [];

    for (let i = 0; i <= numYTicks; i++) {
      const value = minY + (i * (maxY - minY)) / numYTicks;

      ticksY.push(value);
    }

    return ticksY;
  }, [minY, maxY]);

  const linePath = buildLinePath({ y, getXCoord, getYCoord });
  const areaPath = buildAreaPath({
    y,
    getXCoord,
    getYCoord,
    marginTop: MARGIN_TOP,
    chartInnerHeight,
  });

  const line2Path = y2 ? buildLinePath({ y: y2, getXCoord, getYCoord }) : null;

  return (
    <View className="gap-5">
      <ScrollView
        style={{ width }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Svg width={chartWidth} height={height}>
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop
                offset="0%"
                stopColor={colors.primary[500]}
                stopOpacity="0.3"
              />
              <Stop offset="100%" stopColor={colors.white} stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Path d={areaPath} fill="url(#gradient)" />

          {line2Path && (
            <Path
              d={line2Path}
              fill="none"
              stroke={colors.black}
              strokeWidth={2}
              strokeDasharray={[6, 4]}
            />
          )}

          <Path
            d={linePath}
            fill="none"
            stroke={colors.primary[400]}
            strokeWidth={2}
            strokeDasharray={[6, 4]}
          />

          {ticksY.map((val) => {
            const yCoord = getYCoord(val);

            return (
              <Text
                x={MARGIN_LEFT - 30}
                y={yCoord}
                key={`yTick-${val}`}
                fill={colors.gray[500]}
                fontSize={10}
                textAnchor="start"
                alignmentBaseline="middle"
              >
                {formatNumber(val / 100)}
              </Text>
            );
          })}

          {x.map((label, i) => {
            const xCoord = getXCoord(i);

            return (
              <Text
                x={xCoord}
                y={chartInnerHeight + 24}
                key={`xTick-${label}`}
                fill={colors.gray[500]}
                fontSize={10}
                textAnchor="end"
              >
                {label}
              </Text>
            );
          })}
        </Svg>
      </ScrollView>

      {subtitles && (
        <View className="flex-row gap-8">
          <View className="flex-row items-center gap-1">
            <TextUI className="text-sm text-gray-500">{subtitles.y}</TextUI>
            <View className="w-5 border border-dashed border-primary-400" />
          </View>

          {subtitles.y2 && (
            <View className="flex-row items-center gap-1">
              <TextUI className="text-sm text-gray-500">{subtitles.y2}</TextUI>
              <View className="w-5 border border-dashed border-black" />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
