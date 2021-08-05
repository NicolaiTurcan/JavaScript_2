"use strict";
let text = "Sign up for free at Superprof'at and 'teach students online' from the comfort of your home. Set your own rates & be flexible. Tutoring for school, university, sports, leisure & more. Over 1,300 subjects. 'Over 13 million' teachers. We find students for you. Register for free. 'Give tutoring lessons'. Find student's near you. Make good money. Flexible and independent. Teach students worldwide.";
let text2 = text.replace(/\B'|'\B/g, '"');

console.log(text2);
