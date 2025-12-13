CREATE OR REPLACE FUNCTION semantic_similarity(
    v1 double precision[],
    v2 double precision[]
)
RETURNS double precision
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
    SELECT
        (SELECT SUM(a * b)
         FROM unnest(v1, v2) AS t(a, b))
        /
        (
          sqrt((SELECT SUM(a * a) FROM unnest(v1) AS a))
          *
          sqrt((SELECT SUM(b * b) FROM unnest(v2) AS b))
        );
$$;
