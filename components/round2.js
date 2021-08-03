const round2 = (num) => Math.round((num + Number.EPSILON) * 100) / 100

export default round2;
