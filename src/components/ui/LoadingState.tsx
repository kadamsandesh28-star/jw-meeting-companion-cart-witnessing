import {
  Box,
  Skeleton,
  Stack,
} from "@mui/material";

export interface LoadingStateProps {
  /** Number of skeleton rows */
  rows?: number;

  /** Show header skeleton */
  showHeader?: boolean;
}

export default function LoadingState({
  rows = 4,
  showHeader = true,
}: LoadingStateProps) {
  return (
    <Box>
      <Stack spacing={2}>
        {showHeader && (
          <>
            <Skeleton
              variant="text"
              width="40%"
              height={42}
            />

            <Skeleton
              variant="text"
              width="70%"
              height={28}
            />
          </>
        )}

        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            height={60}
          />
        ))}
      </Stack>
    </Box>
  );
}