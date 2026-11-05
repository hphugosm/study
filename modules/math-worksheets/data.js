/* Imported from the supplied solutions; PDF corrections are recorded per item. */
export const worksheetData = {
  "schema": "study.step-solutions.v1",
  "language": "cs-CZ",
  "angle_unit": "radian",
  "generated_from": [
    "Gonio_fce_opakovani.pdf",
    "Opakovani_gonio__ne_rovnice.pdf"
  ],
  "total_exercises": 164,
  "sections": {
    "1. Grafy sin/cos": 30,
    "2. Tangens/kotangens: perioda a asymptoty": 30,
    "1. Přesné hodnoty": 15,
    "2. Základní goniometrické rovnice": 9,
    "3. Rovnice s násobným argumentem": 9,
    "4. Kvadratické goniometrické rovnice": 6,
    "5. Rovnice s úpravami a substitucemi": 9,
    "6. Goniometrické nerovnice": 9,
    "7. Náhodné procvičovací rovnice": 47
  },
  "exercises": [
    {
      "id": "GF1-01",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A1",
      "prompt_latex": "y=2\\sin(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-2;2]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&0&2&0&-2&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-2;2]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 2.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "-2",
            "x": 4.71238898038469,
            "y": -2.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "0",
            "x": 6.283185307179586,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-2;2]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-02",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A2",
      "prompt_latex": "y=-\\cos(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-1,\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-1|=1,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&-1&0&1&0&-1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-1;1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -1.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-1",
            "x": 6.283185307179586,
            "y": -1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-1;1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-03",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A3",
      "prompt_latex": "y=\\sin(2x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=2,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{2}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi\\\\\\hline y&0&1&0&-1&0\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-1;1]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 1.0,
        "b": 2.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-1",
            "x": 2.356194490192345,
            "y": -1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-1;1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-04",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A4",
      "prompt_latex": "y=\\cos\\left(\\frac{x}{2}\\right)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=\\frac{1}{2},\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{\\frac{1}{2}}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\pi&2 \\pi&3 \\pi&4 \\pi\\\\\\hline y&1&0&-1&0&1\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-1;1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 1.0,
        "b": 0.5,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-1",
            "x": 6.283185307179586,
            "y": -1.0
          },
          {
            "x_latex": "3 \\pi",
            "y_latex": "0",
            "x": 9.42477796076938,
            "y": 0.0
          },
          {
            "x_latex": "4 \\pi",
            "y_latex": "1",
            "x": 12.566370614359172,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-1;1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-05",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A5",
      "prompt_latex": "y=\\frac12\\sin(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=\\frac{1}{2},\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|\\frac{1}{2}|=\\frac{1}{2},\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[- \\frac{1}{2};\\frac{1}{2}]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&0&\\frac{1}{2}&0&- \\frac{1}{2}&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[- \\frac{1}{2};\\frac{1}{2}]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 0.5,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "\\frac{1}{2}",
            "x": 1.5707963267948966,
            "y": 0.5
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "- \\frac{1}{2}",
            "x": 4.71238898038469,
            "y": -0.5
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "0",
            "x": 6.283185307179586,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[- \\frac{1}{2};\\frac{1}{2}]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-06",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A6",
      "prompt_latex": "y=3\\cos(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=3,\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|3|=3,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&3&0&-3&0&3\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-3;3]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 3.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "3",
            "x": 0.0,
            "y": 3.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "-3",
            "x": 3.141592653589793,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "3",
            "x": 6.283185307179586,
            "y": 3.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-3;3]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-07",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A7",
      "prompt_latex": "y=\\sin(x)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=1,\\quad c=0,\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[0;2]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&1&2&1&0&1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[0;2]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 1.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 1.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "1",
            "x": 6.283185307179586,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[0;2]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-08",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A8",
      "prompt_latex": "y=\\cos(x)-2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=1,\\quad c=0,\\quad d=-2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=-2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;-1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&-1&-2&-3&-2&-1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-3;-1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 1.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": -2.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": 1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "-3",
            "x": 3.141592653589793,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "-2",
            "x": 4.71238898038469,
            "y": -2.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-1",
            "x": 6.283185307179586,
            "y": -1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-3;-1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-09",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A9",
      "prompt_latex": "y=-2\\sin(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-2,\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-2|=2,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-2;2]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&0&-2&0&2&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-2;2]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": -2.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": 1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "2",
            "x": 4.71238898038469,
            "y": 2.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "0",
            "x": 6.283185307179586,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-2;2]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-10",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "A10",
      "prompt_latex": "y=-3\\cos(x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-3,\\quad b=1,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-3|=3,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&-3&0&3&0&-3\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-3;3]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -3.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-3",
            "x": 0.0,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "3",
            "x": 3.141592653589793,
            "y": 3.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-3",
            "x": 6.283185307179586,
            "y": -3.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-3;3]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-11",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B1",
      "prompt_latex": "y=2\\sin(2x)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=2,\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{2}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-2;2]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi\\\\\\hline y&0&2&0&-2&0\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-2;2]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 2.0,
        "b": 2.0,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "2",
            "x": 0.7853981633974483,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-2",
            "x": 2.356194490192345,
            "y": -2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-2;2]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-12",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B2",
      "prompt_latex": "y=-3\\cos\\left(\\frac{x}{2}\\right)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-3,\\quad b=\\frac{1}{2},\\quad c=0,\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-3|=3,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{\\frac{1}{2}}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\pi&2 \\pi&3 \\pi&4 \\pi\\\\\\hline y&-3&0&3&0&-3\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-3;3]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -3.0,
        "b": 0.5,
        "phase_radians": 0.0,
        "d": 0.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-3",
            "x": 0.0,
            "y": -3.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "3",
            "x": 6.283185307179586,
            "y": 3.0
          },
          {
            "x_latex": "3 \\pi",
            "y_latex": "0",
            "x": 9.42477796076938,
            "y": 0.0
          },
          {
            "x_latex": "4 \\pi",
            "y_latex": "-3",
            "x": 12.566370614359172,
            "y": -3.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-3;3]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-13",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B3",
      "prompt_latex": "y=\\sin\\left(x-\\frac\\pi2\\right)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=1,\\quad c=\\frac{\\pi}{2},\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{1}=\\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi&\\frac{5 \\pi}{2}\\\\\\hline y&0&1&0&-1&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-1;1]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 1.0,
        "b": 1.0,
        "phase_radians": -1.5707963267948966,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-1",
            "x": 6.283185307179586,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{2}",
            "y_latex": "0",
            "x": 7.853981633974483,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-1;1]",
        "horizontal_shift_latex": "\\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-14",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B4",
      "prompt_latex": "y=\\cos\\left(x+\\frac\\pi4\\right)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=1,\\quad b=1,\\quad c=- \\frac{\\pi}{4},\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|1|=1,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{1}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{4}&\\frac{\\pi}{4}&\\frac{3 \\pi}{4}&\\frac{5 \\pi}{4}&\\frac{7 \\pi}{4}\\\\\\hline y&1&0&-1&0&1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-1;1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 1.0,
        "b": 1.0,
        "phase_radians": 0.7853981633974483,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "1",
            "x": -0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "0",
            "x": 0.7853981633974483,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-1",
            "x": 2.356194490192345,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "0",
            "x": 3.9269908169872414,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{4}",
            "y_latex": "1",
            "x": 5.497787143782138,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-1;1]",
        "horizontal_shift_latex": "- \\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-15",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B5",
      "prompt_latex": "y=2\\sin(x)-1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=1,\\quad c=0,\\quad d=-1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=-1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&-1&1&-1&-3&-1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-3;1]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 2.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": -1.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "1",
            "x": 1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "-1",
            "x": 3.141592653589793,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "-3",
            "x": 4.71238898038469,
            "y": -3.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-1",
            "x": 6.283185307179586,
            "y": -1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-3;1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-16",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B6",
      "prompt_latex": "y=-2\\cos(x)+2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-2,\\quad b=1,\\quad c=0,\\quad d=2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-2|=2,\\quad y_0=2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{1}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[0;4]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&0&2&4&2&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[0;4]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -2.0,
        "b": 1.0,
        "phase_radians": 0.0,
        "d": 2.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "4",
            "x": 3.141592653589793,
            "y": 4.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "2",
            "x": 4.71238898038469,
            "y": 2.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "0",
            "x": 6.283185307179586,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[0;4]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-17",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B7",
      "prompt_latex": "y=3\\sin\\left(x-\\frac\\pi2\\right)",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=3,\\quad b=1,\\quad c=\\frac{\\pi}{2},\\quad d=0"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|3|=3,\\quad y_0=0"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|1|}=2 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{1}=\\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{2}&\\pi&\\frac{3 \\pi}{2}&2 \\pi&\\frac{5 \\pi}{2}\\\\\\hline y&0&3&0&-3&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad H_f=[-3;3]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 3.0,
        "b": 1.0,
        "phase_radians": -1.5707963267948966,
        "d": 0.0,
        "period": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "3",
            "x": 3.141592653589793,
            "y": 3.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "0",
            "x": 4.71238898038469,
            "y": 0.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-3",
            "x": 6.283185307179586,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{2}",
            "y_latex": "0",
            "x": 7.853981633974483,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "2 \\pi",
        "range_latex": "[-3;3]",
        "horizontal_shift_latex": "\\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-18",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B8",
      "prompt_latex": "y=-\\cos(2x)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-1,\\quad b=2,\\quad c=0,\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-1|=1,\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{2}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[0;2]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi\\\\\\hline y&0&1&2&1&0\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[0;2]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -1.0,
        "b": 2.0,
        "phase_radians": 0.0,
        "d": 1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "1",
            "x": 2.356194490192345,
            "y": 1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "0",
            "x": 3.141592653589793,
            "y": 0.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[0;2]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-19",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B9",
      "prompt_latex": "y=\\frac12\\sin(2x)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=\\frac{1}{2},\\quad b=2,\\quad c=0,\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|\\frac{1}{2}|=\\frac{1}{2},\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{2}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[\\frac{1}{2};\\frac{3}{2}]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi\\\\\\hline y&1&\\frac{3}{2}&1&\\frac{1}{2}&1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[\\frac{1}{2};\\frac{3}{2}]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 0.5,
        "b": 2.0,
        "phase_radians": 0.0,
        "d": 1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "\\frac{3}{2}",
            "x": 0.7853981633974483,
            "y": 1.5
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "1",
            "x": 1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "\\frac{1}{2}",
            "x": 2.356194490192345,
            "y": 0.5
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[\\frac{1}{2};\\frac{3}{2}]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-20",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "B10",
      "prompt_latex": "y=2\\cos\\left(\\frac{x}{2}\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=\\frac{1}{2},\\quad c=0,\\quad d=-1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=-1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{0}{\\frac{1}{2}}=0"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&0&\\pi&2 \\pi&3 \\pi&4 \\pi\\\\\\hline y&1&-1&-3&-1&1\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-3;1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 2.0,
        "b": 0.5,
        "phase_radians": 0.0,
        "d": -1.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "-1",
            "x": 3.141592653589793,
            "y": -1.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "-3",
            "x": 6.283185307179586,
            "y": -3.0
          },
          {
            "x_latex": "3 \\pi",
            "y_latex": "-1",
            "x": 9.42477796076938,
            "y": -1.0
          },
          {
            "x_latex": "4 \\pi",
            "y_latex": "1",
            "x": 12.566370614359172,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-3;1]",
        "horizontal_shift_latex": "0"
      }
    },
    {
      "id": "GF1-21",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C1",
      "prompt_latex": "y=2\\sin(2x-\\pi)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=2,\\quad c=\\frac{\\pi}{2},\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\pi}{2}=\\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi&\\frac{5 \\pi}{4}&\\frac{3 \\pi}{2}\\\\\\hline y&1&3&1&-1&1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-1;3]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 2.0,
        "b": 2.0,
        "phase_radians": -3.141592653589793,
        "d": 1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "1",
            "x": 1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "3",
            "x": 2.356194490192345,
            "y": 3.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "-1",
            "x": 3.9269908169872414,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "1",
            "x": 4.71238898038469,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-1;3]",
        "horizontal_shift_latex": "\\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-22",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C2",
      "prompt_latex": "y=-2\\cos\\left(\\frac{x}{2}+\\frac\\pi8\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-2,\\quad b=\\frac{1}{2},\\quad c=- \\frac{\\pi}{4},\\quad d=-1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-2|=2,\\quad y_0=-1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\frac{\\pi}{8}}{\\frac{1}{2}}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-3;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{4}&\\frac{3 \\pi}{4}&\\frac{7 \\pi}{4}&\\frac{11 \\pi}{4}&\\frac{15 \\pi}{4}\\\\\\hline y&-3&-1&1&-1&-3\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-3;1]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -2.0,
        "b": 0.5,
        "phase_radians": 0.39269908169872414,
        "d": -1.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "-3",
            "x": -0.7853981633974483,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-1",
            "x": 2.356194490192345,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{4}",
            "y_latex": "1",
            "x": 5.497787143782138,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{11 \\pi}{4}",
            "y_latex": "-1",
            "x": 8.639379797371932,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{15 \\pi}{4}",
            "y_latex": "-3",
            "x": 11.780972450961725,
            "y": -3.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-3;1]",
        "horizontal_shift_latex": "- \\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-23",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C3",
      "prompt_latex": "y=3\\sin\\left(2x+\\frac\\pi2\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=3,\\quad b=2,\\quad c=- \\frac{\\pi}{4},\\quad d=-2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|3|=3,\\quad y_0=-2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-5;1]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{4}&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}\\\\\\hline y&-2&1&-2&-5&-2\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-5;1]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 3.0,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": -2.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "-2",
            "x": -0.7853981633974483,
            "y": -2.0
          },
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-2",
            "x": 0.7853981633974483,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-5",
            "x": 1.5707963267948966,
            "y": -5.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-2",
            "x": 2.356194490192345,
            "y": -2.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-5;1]",
        "horizontal_shift_latex": "- \\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-24",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C4",
      "prompt_latex": "y=-\\cos\\left(\\frac{x}{2}-\\frac\\pi4\\right)+2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-1,\\quad b=\\frac{1}{2},\\quad c=\\frac{\\pi}{2},\\quad d=2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-1|=1,\\quad y_0=2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{\\frac{1}{2}}=\\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[1;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{2}&\\frac{3 \\pi}{2}&\\frac{5 \\pi}{2}&\\frac{7 \\pi}{2}&\\frac{9 \\pi}{2}\\\\\\hline y&1&2&3&2&1\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[1;3]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -1.0,
        "b": 0.5,
        "phase_radians": -0.7853981633974483,
        "d": 2.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "1",
            "x": 1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "2",
            "x": 4.71238898038469,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{2}",
            "y_latex": "3",
            "x": 7.853981633974483,
            "y": 3.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{2}",
            "y_latex": "2",
            "x": 10.995574287564276,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{9 \\pi}{2}",
            "y_latex": "1",
            "x": 14.137166941154069,
            "y": 1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[1;3]",
        "horizontal_shift_latex": "\\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-25",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C5",
      "prompt_latex": "y=\\frac12\\sin\\left(2x-\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=\\frac{1}{2},\\quad b=2,\\quad c=\\frac{\\pi}{4},\\quad d=-1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|\\frac{1}{2}|=\\frac{1}{2},\\quad y_0=-1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[- \\frac{3}{2};- \\frac{1}{2}]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi&\\frac{5 \\pi}{4}\\\\\\hline y&-1&- \\frac{1}{2}&-1&- \\frac{3}{2}&-1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[- \\frac{3}{2};- \\frac{1}{2}]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 0.5,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": -1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-1",
            "x": 0.7853981633974483,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "- \\frac{1}{2}",
            "x": 1.5707963267948966,
            "y": -0.5
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-1",
            "x": 2.356194490192345,
            "y": -1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "- \\frac{3}{2}",
            "x": 3.141592653589793,
            "y": -1.5
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "-1",
            "x": 3.9269908169872414,
            "y": -1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[- \\frac{3}{2};- \\frac{1}{2}]",
        "horizontal_shift_latex": "\\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-26",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C6",
      "prompt_latex": "y=-3\\cos(2x+\\pi)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-3,\\quad b=2,\\quad c=- \\frac{\\pi}{2},\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-3|=3,\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\pi}{2}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-2;4]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{2}&- \\frac{\\pi}{4}&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}\\\\\\hline y&-2&1&4&1&-2\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-2;4]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -3.0,
        "b": 2.0,
        "phase_radians": 3.141592653589793,
        "d": 1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": -1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "1",
            "x": -0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "0",
            "y_latex": "4",
            "x": 0.0,
            "y": 4.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": 1.5707963267948966,
            "y": -2.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-2;4]",
        "horizontal_shift_latex": "- \\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-27",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C7",
      "prompt_latex": "y=2\\sin\\left(\\frac{x}{2}+\\frac\\pi4\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=2,\\quad b=\\frac{1}{2},\\quad c=- \\frac{\\pi}{2},\\quad d=-2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|2|=2,\\quad y_0=-2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{\\frac{1}{2}}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-4;0]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{2}&\\frac{\\pi}{2}&\\frac{3 \\pi}{2}&\\frac{5 \\pi}{2}&\\frac{7 \\pi}{2}\\\\\\hline y&-2&0&-2&-4&-2\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-4;0]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 2.0,
        "b": 0.5,
        "phase_radians": 0.7853981633974483,
        "d": -2.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": -1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "-2",
            "x": 4.71238898038469,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{2}",
            "y_latex": "-4",
            "x": 7.853981633974483,
            "y": -4.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{2}",
            "y_latex": "-2",
            "x": 10.995574287564276,
            "y": -2.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-4;0]",
        "horizontal_shift_latex": "- \\frac{\\pi}{2}"
      }
    },
    {
      "id": "GF1-28",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C8",
      "prompt_latex": "y=-2\\cos\\left(2x-\\frac\\pi2\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=-2,\\quad b=2,\\quad c=\\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|-2|=2,\\quad y_0=1"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;3]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}&\\pi&\\frac{5 \\pi}{4}\\\\\\hline y&-1&1&3&1&-1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[-1;3]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": -2.0,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": 1.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-1",
            "x": 0.7853981633974483,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "1",
            "x": 1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "3",
            "x": 2.356194490192345,
            "y": 3.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "-1",
            "x": 3.9269908169872414,
            "y": -1.0
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[-1;3]",
        "horizontal_shift_latex": "\\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-29",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C9",
      "prompt_latex": "y=3\\sin\\left(\\frac{x}{2}-\\frac\\pi8\\right)+2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=3,\\quad b=\\frac{1}{2},\\quad c=\\frac{\\pi}{4},\\quad d=2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|3|=3,\\quad y_0=2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|\\frac{1}{2}|}=4 \\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{- \\frac{\\pi}{8}}{\\frac{1}{2}}=\\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[-1;5]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&\\frac{\\pi}{4}&\\frac{5 \\pi}{4}&\\frac{9 \\pi}{4}&\\frac{13 \\pi}{4}&\\frac{17 \\pi}{4}\\\\\\hline y&2&5&2&-1&2\\end{array}"
        }
      ],
      "answer_latex": "T=4 \\pi,\\quad H_f=[-1;5]",
      "visualization": {
        "type": "function_graph",
        "function": "sin",
        "a": 3.0,
        "b": 0.5,
        "phase_radians": -0.39269908169872414,
        "d": 2.0,
        "period": 12.566370614359172,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "2",
            "x": 0.7853981633974483,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "5",
            "x": 3.9269908169872414,
            "y": 5.0
          },
          {
            "x_latex": "\\frac{9 \\pi}{4}",
            "y_latex": "2",
            "x": 7.0685834705770345,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{13 \\pi}{4}",
            "y_latex": "-1",
            "x": 10.210176124166829,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{17 \\pi}{4}",
            "y_latex": "2",
            "x": 13.351768777756622,
            "y": 2.0
          }
        ]
      },
      "metadata": {
        "period_latex": "4 \\pi",
        "range_latex": "[-1;5]",
        "horizontal_shift_latex": "\\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF1-30",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "1. Grafy sin/cos",
      "source_label": "C10",
      "prompt_latex": "y=\\frac12\\cos\\left(2x+\\frac\\pi2\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme tvar",
          "explanation": "Zadání přepíšeme na obecný tvar. Parametr a mění svislé měřítko, b periodu, c vodorovný posun a d posun nahoru/dolů.",
          "latex": "a=\\frac{1}{2},\\quad b=2,\\quad c=- \\frac{\\pi}{4},\\quad d=-2"
        },
        {
          "title": "Amplituda a osová přímka",
          "explanation": "Amplituda je absolutní hodnota koeficientu a. Střední čára grafu má rovnici y=d. Záporné a navíc převrací graf kolem střední čáry.",
          "latex": "A=|\\frac{1}{2}|=\\frac{1}{2},\\quad y_0=-2"
        },
        {
          "title": "Perioda",
          "explanation": "Sinus i kosinus mají základní periodu 2π. Při koeficientu b uvnitř závorky ji vydělíme |b|.",
          "latex": "T=\\frac{2\\pi}{|2|}=\\pi"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "Abychom určili posun, řešíme bx+φ=0. Proto c=−φ/b. Kladné c znamená posun doprava, záporné doleva.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Obor hodnot",
          "explanation": "Každý sinus i kosinus nabývá čísel od −1 do 1; po násobení a a posunu d získáme krajní hodnoty d−|a| a d+|a|.",
          "latex": "H_f=[- \\frac{5}{2};- \\frac{3}{2}]"
        },
        {
          "title": "Body pro náčrt",
          "explanation": "Projdeme jednu periodu v krocích čtvrtiny periody: základní argument je postupně 0, π/2, π, 3π/2 a 2π. Každý bod získáme dosazením do funkce.",
          "latex": "\\begin{array}{c|ccccc}x&- \\frac{\\pi}{4}&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}\\\\\\hline y&- \\frac{3}{2}&-2&- \\frac{5}{2}&-2&- \\frac{3}{2}\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad H_f=[- \\frac{5}{2};- \\frac{3}{2}]",
      "visualization": {
        "type": "function_graph",
        "function": "cos",
        "a": 0.5,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": -2.0,
        "period": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "- \\frac{3}{2}",
            "x": -0.7853981633974483,
            "y": -1.5
          },
          {
            "x_latex": "0",
            "y_latex": "-2",
            "x": 0.0,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "- \\frac{5}{2}",
            "x": 0.7853981633974483,
            "y": -2.5
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": 1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "- \\frac{3}{2}",
            "x": 2.356194490192345,
            "y": -1.5
          }
        ]
      },
      "metadata": {
        "period_latex": "\\pi",
        "range_latex": "[- \\frac{5}{2};- \\frac{3}{2}]",
        "horizontal_shift_latex": "- \\frac{\\pi}{4}"
      }
    },
    {
      "id": "GF2-01",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A1",
      "prompt_latex": "y=2\\tan\\left(2x-\\frac\\pi2\\right)",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=2,\\quad \\varphi=- \\frac{\\pi}{2},\\quad d=0"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{8}&\\frac{\\pi}{4}&\\frac{3 \\pi}{8}\\\\\\hline y&-2&0&2\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 2.0,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": 0.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{8}",
            "y_latex": "-2",
            "x": 0.39269908169872414,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "0",
            "x": 0.7853981633974483,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{8}",
            "y_latex": "2",
            "x": 1.1780972450961724,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-02",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A2",
      "prompt_latex": "y=-\\cot\\left(\\frac x2+\\frac\\pi4\\right)",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-1,\\quad b=\\frac{1}{2},\\quad \\varphi=\\frac{\\pi}{4},\\quad d=0"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{\\frac{1}{2}}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(\\frac{\\pi}{4})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{2}&\\pi\\\\\\hline y&-1&0&1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -1.0,
        "b": 0.5,
        "phase_radians": 0.7853981633974483,
        "d": 0.0,
        "period": 6.283185307179586,
        "asymptote_anchor": -1.5707963267948966,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "0",
            "x": 1.5707963267948966,
            "y": 0.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "1",
            "x": 3.141592653589793,
            "y": 1.0
          }
        ]
      }
    },
    {
      "id": "GF2-03",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A3",
      "prompt_latex": "y=\\tan\\left(x-\\frac\\pi4\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=1,\\quad b=1,\\quad \\varphi=- \\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{1}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(- \\frac{\\pi}{4})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}\\\\\\hline y&0&1&2\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 1.0,
        "b": 1.0,
        "phase_radians": -0.7853981633974483,
        "d": 1.0,
        "period": 3.141592653589793,
        "asymptote_anchor": 2.356194490192345,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-04",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A4",
      "prompt_latex": "y=-2\\cot\\left(x+\\frac\\pi2\\right)",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-2,\\quad b=1,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=0"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{1}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(\\frac{\\pi}{2})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{4}&0&\\frac{\\pi}{4}\\\\\\hline y&-2&0&2\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -2.0,
        "b": 1.0,
        "phase_radians": 1.5707963267948966,
        "d": 0.0,
        "period": 3.141592653589793,
        "asymptote_anchor": -1.5707963267948966,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "-2",
            "x": -0.7853981633974483,
            "y": -2.0
          },
          {
            "x_latex": "0",
            "y_latex": "0",
            "x": 0.0,
            "y": 0.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "2",
            "x": 0.7853981633974483,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-05",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A5",
      "prompt_latex": "y=3\\tan\\left(2x-\\frac\\pi2\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=3,\\quad b=2,\\quad \\varphi=- \\frac{\\pi}{2},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{8}&\\frac{\\pi}{4}&\\frac{3 \\pi}{8}\\\\\\hline y&-2&1&4\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 3.0,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": 1.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{8}",
            "y_latex": "-2",
            "x": 0.39269908169872414,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{8}",
            "y_latex": "4",
            "x": 1.1780972450961724,
            "y": 4.0
          }
        ]
      }
    },
    {
      "id": "GF2-06",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A6",
      "prompt_latex": "y=2\\cot\\left(\\frac x2+\\frac\\pi8\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=\\frac{1}{2},\\quad \\varphi=\\frac{\\pi}{8},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{8}}{\\frac{1}{2}}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(\\frac{\\pi}{8})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{4}&\\frac{3 \\pi}{4}&\\frac{5 \\pi}{4}\\\\\\hline y&1&-1&-3\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 2.0,
        "b": 0.5,
        "phase_radians": 0.39269908169872414,
        "d": -1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "-1",
            "x": 2.356194490192345,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "-3",
            "x": 3.9269908169872414,
            "y": -3.0
          }
        ]
      }
    },
    {
      "id": "GF2-07",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A7",
      "prompt_latex": "y=-\\tan(2x+\\pi)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-1,\\quad b=2,\\quad \\varphi=\\pi,\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\pi}{2}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\pi)=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{5 \\pi}{8}&- \\frac{\\pi}{2}&- \\frac{3 \\pi}{8}\\\\\\hline y&3&2&1\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": -1.0,
        "b": 2.0,
        "phase_radians": 3.141592653589793,
        "d": 2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{5 \\pi}{8}",
            "y_latex": "3",
            "x": -1.9634954084936207,
            "y": 3.0
          },
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "2",
            "x": -1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "- \\frac{3 \\pi}{8}",
            "y_latex": "1",
            "x": -1.1780972450961724,
            "y": 1.0
          }
        ]
      }
    },
    {
      "id": "GF2-08",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A8",
      "prompt_latex": "y=-3\\cot\\left(2x-\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-3,\\quad b=2,\\quad \\varphi=- \\frac{\\pi}{2},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\frac{\\pi}{2})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{3 \\pi}{8}&\\frac{\\pi}{2}&\\frac{5 \\pi}{8}\\\\\\hline y&-4&-1&2\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -3.0,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": -1.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 0.7853981633974483,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{3 \\pi}{8}",
            "y_latex": "-4",
            "x": 1.1780972450961724,
            "y": -4.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-1",
            "x": 1.5707963267948966,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{8}",
            "y_latex": "2",
            "x": 1.9634954084936207,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-09",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A9",
      "prompt_latex": "y=2\\tan\\left(\\frac x2+\\frac\\pi4\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=\\frac{1}{2},\\quad \\varphi=\\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{\\frac{1}{2}}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(\\frac{\\pi}{4})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\pi&- \\frac{\\pi}{2}&0\\\\\\hline y&-1&1&3\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 2.0,
        "b": 0.5,
        "phase_radians": 0.7853981633974483,
        "d": 1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "- \\pi",
            "y_latex": "-1",
            "x": -3.141592653589793,
            "y": -1.0
          },
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "1",
            "x": -1.5707963267948966,
            "y": 1.0
          },
          {
            "x_latex": "0",
            "y_latex": "3",
            "x": 0.0,
            "y": 3.0
          }
        ]
      }
    },
    {
      "id": "GF2-10",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "A10",
      "prompt_latex": "y=\\cot\\left(2x+\\frac\\pi2\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=1,\\quad b=2,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=-2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\frac{\\pi}{2})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{8}&0&\\frac{\\pi}{8}\\\\\\hline y&-1&-2&-3\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 1.0,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": -2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{8}",
            "y_latex": "-1",
            "x": -0.39269908169872414,
            "y": -1.0
          },
          {
            "x_latex": "0",
            "y_latex": "-2",
            "x": 0.0,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{8}",
            "y_latex": "-3",
            "x": 0.39269908169872414,
            "y": -3.0
          }
        ]
      }
    },
    {
      "id": "GF2-11",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B1",
      "prompt_latex": "y=-2\\tan\\left(x-\\frac\\pi4\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-2,\\quad b=1,\\quad \\varphi=- \\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{1}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(- \\frac{\\pi}{4})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}\\\\\\hline y&3&1&-1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{3 \\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": -2.0,
        "b": 1.0,
        "phase_radians": -0.7853981633974483,
        "d": 1.0,
        "period": 3.141592653589793,
        "asymptote_anchor": 2.356194490192345,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "3",
            "x": 0.0,
            "y": 3.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-1",
            "x": 1.5707963267948966,
            "y": -1.0
          }
        ]
      }
    },
    {
      "id": "GF2-12",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B2",
      "prompt_latex": "y=3\\cot\\left(x+\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=3,\\quad b=1,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{1}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(\\frac{\\pi}{2})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{4}&0&\\frac{\\pi}{4}\\\\\\hline y&2&-1&-4\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{2}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 3.0,
        "b": 1.0,
        "phase_radians": 1.5707963267948966,
        "d": -1.0,
        "period": 3.141592653589793,
        "asymptote_anchor": -1.5707963267948966,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "2",
            "x": -0.7853981633974483,
            "y": 2.0
          },
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-4",
            "x": 0.7853981633974483,
            "y": -4.0
          }
        ]
      }
    },
    {
      "id": "GF2-13",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B3",
      "prompt_latex": "y=\\frac12\\tan(2x-\\pi)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=\\frac{1}{2},\\quad b=2,\\quad \\varphi=- \\pi,\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\pi}{2}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\pi)=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{3 \\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{3 \\pi}{8}&\\frac{\\pi}{2}&\\frac{5 \\pi}{8}\\\\\\hline y&\\frac{3}{2}&2&\\frac{5}{2}\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{3 \\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{3 \\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{3 \\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 0.5,
        "b": 2.0,
        "phase_radians": -3.141592653589793,
        "d": 2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 2.356194490192345,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{3 \\pi}{8}",
            "y_latex": "\\frac{3}{2}",
            "x": 1.1780972450961724,
            "y": 1.5
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "2",
            "x": 1.5707963267948966,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{8}",
            "y_latex": "\\frac{5}{2}",
            "x": 1.9634954084936207,
            "y": 2.5
          }
        ]
      }
    },
    {
      "id": "GF2-14",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B4",
      "prompt_latex": "y=-\\frac12\\cot\\left(\\frac x2-\\frac\\pi8\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=- \\frac{1}{2},\\quad b=\\frac{1}{2},\\quad \\varphi=- \\frac{\\pi}{8},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{8}}{\\frac{1}{2}}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(- \\frac{\\pi}{8})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{3 \\pi}{4}&\\frac{5 \\pi}{4}&\\frac{7 \\pi}{4}\\\\\\hline y&\\frac{1}{2}&1&\\frac{3}{2}\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -0.5,
        "b": 0.5,
        "phase_radians": -0.39269908169872414,
        "d": 1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 0.7853981633974483,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "\\frac{1}{2}",
            "x": 2.356194490192345,
            "y": 0.5
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "1",
            "x": 3.9269908169872414,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{4}",
            "y_latex": "\\frac{3}{2}",
            "x": 5.497787143782138,
            "y": 1.5
          }
        ]
      }
    },
    {
      "id": "GF2-15",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B5",
      "prompt_latex": "y=2\\tan\\left(2x+\\frac\\pi2\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=2,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=-2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{3 \\pi}{8}&- \\frac{\\pi}{4}&- \\frac{\\pi}{8}\\\\\\hline y&-4&-2&0\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 2.0,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": -2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 0.0,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{3 \\pi}{8}",
            "y_latex": "-4",
            "x": -1.1780972450961724,
            "y": -4.0
          },
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "-2",
            "x": -0.7853981633974483,
            "y": -2.0
          },
          {
            "x_latex": "- \\frac{\\pi}{8}",
            "y_latex": "0",
            "x": -0.39269908169872414,
            "y": 0.0
          }
        ]
      }
    },
    {
      "id": "GF2-16",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B6",
      "prompt_latex": "y=-2\\cot(2x+\\pi)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-2,\\quad b=2,\\quad \\varphi=\\pi,\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\pi}{2}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\pi)=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{3 \\pi}{8}&- \\frac{\\pi}{4}&- \\frac{\\pi}{8}\\\\\\hline y&0&2&4\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=- \\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=- \\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -2.0,
        "b": 2.0,
        "phase_radians": 3.141592653589793,
        "d": 2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": -1.5707963267948966,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{3 \\pi}{8}",
            "y_latex": "0",
            "x": -1.1780972450961724,
            "y": 0.0
          },
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "2",
            "x": -0.7853981633974483,
            "y": 2.0
          },
          {
            "x_latex": "- \\frac{\\pi}{8}",
            "y_latex": "4",
            "x": -0.39269908169872414,
            "y": 4.0
          }
        ]
      }
    },
    {
      "id": "GF2-17",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B7",
      "prompt_latex": "y=3\\tan\\left(\\frac x2-\\frac\\pi4\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=3,\\quad b=\\frac{1}{2},\\quad \\varphi=- \\frac{\\pi}{4},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{\\frac{1}{2}}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(- \\frac{\\pi}{4})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{2}&\\pi\\\\\\hline y&-4&-1&2\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 3.0,
        "b": 0.5,
        "phase_radians": -0.7853981633974483,
        "d": -1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 4.71238898038469,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-4",
            "x": 0.0,
            "y": -4.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-1",
            "x": 1.5707963267948966,
            "y": -1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "2",
            "x": 3.141592653589793,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-18",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B8",
      "prompt_latex": "y=-3\\cot\\left(\\frac x2+\\frac\\pi8\\right)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-3,\\quad b=\\frac{1}{2},\\quad \\varphi=\\frac{\\pi}{8},\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{8}}{\\frac{1}{2}}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(\\frac{\\pi}{8})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{4}&\\frac{3 \\pi}{4}&\\frac{5 \\pi}{4}\\\\\\hline y&-1&2&5\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -3.0,
        "b": 0.5,
        "phase_radians": 0.39269908169872414,
        "d": 2.0,
        "period": 6.283185307179586,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-1",
            "x": 0.7853981633974483,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "2",
            "x": 2.356194490192345,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{5 \\pi}{4}",
            "y_latex": "5",
            "x": 3.9269908169872414,
            "y": 5.0
          }
        ]
      }
    },
    {
      "id": "GF2-19",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B9",
      "prompt_latex": "y=\\tan\\left(2x-\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=1,\\quad b=2,\\quad \\varphi=- \\frac{\\pi}{2},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{2}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{8}&\\frac{\\pi}{4}&\\frac{3 \\pi}{8}\\\\\\hline y&-2&-1&0\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 1.0,
        "b": 2.0,
        "phase_radians": -1.5707963267948966,
        "d": -1.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{8}",
            "y_latex": "-2",
            "x": 0.39269908169872414,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-1",
            "x": 0.7853981633974483,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{8}",
            "y_latex": "0",
            "x": 1.1780972450961724,
            "y": 0.0
          }
        ]
      }
    },
    {
      "id": "GF2-20",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "B10",
      "prompt_latex": "y=\\cot\\left(\\frac x2-\\frac\\pi4\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=1,\\quad b=\\frac{1}{2},\\quad \\varphi=- \\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{\\frac{1}{2}}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(- \\frac{\\pi}{4})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&2&1&0\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 1.0,
        "b": 0.5,
        "phase_radians": -0.7853981633974483,
        "d": 1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\pi",
            "y_latex": "2",
            "x": 3.141592653589793,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "1",
            "x": 4.71238898038469,
            "y": 1.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "0",
            "x": 6.283185307179586,
            "y": 0.0
          }
        ]
      }
    },
    {
      "id": "GF2-21",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C1",
      "prompt_latex": "y=-2\\tan(2x+\\pi)-2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-2,\\quad b=2,\\quad \\varphi=\\pi,\\quad d=-2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\pi}{2}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\pi)=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{5 \\pi}{8}&- \\frac{\\pi}{2}&- \\frac{3 \\pi}{8}\\\\\\hline y&0&-2&-4\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": -2.0,
        "b": 2.0,
        "phase_radians": 3.141592653589793,
        "d": -2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{5 \\pi}{8}",
            "y_latex": "0",
            "x": -1.9634954084936207,
            "y": 0.0
          },
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "-2",
            "x": -1.5707963267948966,
            "y": -2.0
          },
          {
            "x_latex": "- \\frac{3 \\pi}{8}",
            "y_latex": "-4",
            "x": -1.1780972450961724,
            "y": -4.0
          }
        ]
      }
    },
    {
      "id": "GF2-22",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C2",
      "prompt_latex": "y=2\\cot\\left(\\frac x2+\\frac\\pi4\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=\\frac{1}{2},\\quad \\varphi=\\frac{\\pi}{4},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{\\frac{1}{2}}=- \\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(\\frac{\\pi}{4})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{2}&\\pi\\\\\\hline y&1&-1&-3\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 2.0,
        "b": 0.5,
        "phase_radians": 0.7853981633974483,
        "d": -1.0,
        "period": 6.283185307179586,
        "asymptote_anchor": -1.5707963267948966,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "1",
            "x": 0.0,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-1",
            "x": 1.5707963267948966,
            "y": -1.0
          },
          {
            "x_latex": "\\pi",
            "y_latex": "-3",
            "x": 3.141592653589793,
            "y": -3.0
          }
        ]
      }
    },
    {
      "id": "GF2-23",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C3",
      "prompt_latex": "y=-3\\tan\\left(x+\\frac\\pi4\\right)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-3,\\quad b=1,\\quad \\varphi=\\frac{\\pi}{4},\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{1}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(\\frac{\\pi}{4})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{2}&- \\frac{\\pi}{4}&0\\\\\\hline y&5&2&-1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=\\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=\\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": -3.0,
        "b": 1.0,
        "phase_radians": 0.7853981633974483,
        "d": 2.0,
        "period": 3.141592653589793,
        "asymptote_anchor": 0.7853981633974483,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{2}",
            "y_latex": "5",
            "x": -1.5707963267948966,
            "y": 5.0
          },
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "2",
            "x": -0.7853981633974483,
            "y": 2.0
          },
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          }
        ]
      }
    },
    {
      "id": "GF2-24",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C4",
      "prompt_latex": "y=3\\cot(2x-\\pi)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=3,\\quad b=2,\\quad \\varphi=- \\pi,\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\pi}{2}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(- \\pi)=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{5 \\pi}{8}&\\frac{3 \\pi}{4}&\\frac{7 \\pi}{8}\\\\\\hline y&4&1&-2\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": 3.0,
        "b": 2.0,
        "phase_radians": -3.141592653589793,
        "d": 1.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "\\frac{5 \\pi}{8}",
            "y_latex": "4",
            "x": 1.9634954084936207,
            "y": 4.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "1",
            "x": 2.356194490192345,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{7 \\pi}{8}",
            "y_latex": "-2",
            "x": 2.748893571891069,
            "y": -2.0
          }
        ]
      }
    },
    {
      "id": "GF2-25",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C5",
      "prompt_latex": "y=\\frac12\\tan\\left(\\frac x2-\\frac\\pi8\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=\\frac{1}{2},\\quad b=\\frac{1}{2},\\quad \\varphi=- \\frac{\\pi}{8},\\quad d=-2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{8}}{\\frac{1}{2}}=\\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(- \\frac{\\pi}{8})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{5 \\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{4}&\\frac{\\pi}{4}&\\frac{3 \\pi}{4}\\\\\\hline y&- \\frac{5}{2}&-2&- \\frac{3}{2}\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{5 \\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{5 \\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{5 \\pi}{4}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 0.5,
        "b": 0.5,
        "phase_radians": -0.39269908169872414,
        "d": -2.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 3.9269908169872414,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "- \\frac{5}{2}",
            "x": -0.7853981633974483,
            "y": -2.5
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-2",
            "x": 0.7853981633974483,
            "y": -2.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "- \\frac{3}{2}",
            "x": 2.356194490192345,
            "y": -1.5
          }
        ]
      }
    },
    {
      "id": "GF2-26",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C6",
      "prompt_latex": "y=-\\frac12\\cot\\left(2x+\\frac\\pi2\\right)+2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=- \\frac{1}{2},\\quad b=2,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\frac{\\pi}{2})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{\\pi}{8}&0&\\frac{\\pi}{8}\\\\\\hline y&\\frac{3}{2}&2&\\frac{5}{2}\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -0.5,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": 2.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{\\pi}{8}",
            "y_latex": "\\frac{3}{2}",
            "x": -0.39269908169872414,
            "y": 1.5
          },
          {
            "x_latex": "0",
            "y_latex": "2",
            "x": 0.0,
            "y": 2.0
          },
          {
            "x_latex": "\\frac{\\pi}{8}",
            "y_latex": "\\frac{5}{2}",
            "x": 0.39269908169872414,
            "y": 2.5
          }
        ]
      }
    },
    {
      "id": "GF2-27",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C7",
      "prompt_latex": "y=2\\tan\\left(x-\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=2,\\quad b=1,\\quad \\varphi=- \\frac{\\pi}{2},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{2}}{1}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(- \\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\pi+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\frac{\\pi}{4}&\\frac{\\pi}{2}&\\frac{3 \\pi}{4}\\\\\\hline y&-3&-1&1\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=\\pi+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=\\pi+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\pi+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 2.0,
        "b": 1.0,
        "phase_radians": -1.5707963267948966,
        "d": -1.0,
        "period": 3.141592653589793,
        "asymptote_anchor": 3.141592653589793,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "-3",
            "x": 0.7853981633974483,
            "y": -3.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "-1",
            "x": 1.5707963267948966,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{4}",
            "y_latex": "1",
            "x": 2.356194490192345,
            "y": 1.0
          }
        ]
      }
    },
    {
      "id": "GF2-28",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C8",
      "prompt_latex": "y=-2\\cot\\left(x+\\frac\\pi4\\right)+1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-2,\\quad b=1,\\quad \\varphi=\\frac{\\pi}{4},\\quad d=1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{4}}{1}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|1|}=\\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "1x+(\\frac{\\pi}{4})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=- \\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&0&\\frac{\\pi}{4}&\\frac{\\pi}{2}\\\\\\hline y&-1&1&3\\end{array}"
        }
      ],
      "answer_latex": "T=\\pi,\\quad x=- \\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\pi",
        "asymptotes_latex": "x=- \\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=- \\frac{\\pi}{4}+k\\,\\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -2.0,
        "b": 1.0,
        "phase_radians": 0.7853981633974483,
        "d": 1.0,
        "period": 3.141592653589793,
        "asymptote_anchor": -0.7853981633974483,
        "asymptote_spacing": 3.141592653589793,
        "points": [
          {
            "x_latex": "0",
            "y_latex": "-1",
            "x": 0.0,
            "y": -1.0
          },
          {
            "x_latex": "\\frac{\\pi}{4}",
            "y_latex": "1",
            "x": 0.7853981633974483,
            "y": 1.0
          },
          {
            "x_latex": "\\frac{\\pi}{2}",
            "y_latex": "3",
            "x": 1.5707963267948966,
            "y": 3.0
          }
        ]
      }
    },
    {
      "id": "GF2-29",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C9",
      "prompt_latex": "y=3\\tan\\left(2x+\\frac\\pi2\\right)-1",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a tan(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=3,\\quad b=2,\\quad \\varphi=\\frac{\\pi}{2},\\quad d=-1"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{\\frac{\\pi}{2}}{2}=- \\frac{\\pi}{4}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|2|}=\\frac{\\pi}{2}"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Kosinus argumentu je nulový v π/2+kπ, a tangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "2x+(\\frac{\\pi}{2})=\\frac\\pi2+k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&- \\frac{3 \\pi}{8}&- \\frac{\\pi}{4}&- \\frac{\\pi}{8}\\\\\\hline y&-4&-1&2\\end{array}"
        }
      ],
      "answer_latex": "T=\\frac{\\pi}{2},\\quad x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "\\frac{\\pi}{2}",
        "asymptotes_latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=0+k\\,\\frac{\\pi}{2},\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "tan",
        "a": 3.0,
        "b": 2.0,
        "phase_radians": 1.5707963267948966,
        "d": -1.0,
        "period": 1.5707963267948966,
        "asymptote_anchor": 0.0,
        "asymptote_spacing": 1.5707963267948966,
        "points": [
          {
            "x_latex": "- \\frac{3 \\pi}{8}",
            "y_latex": "-4",
            "x": -1.1780972450961724,
            "y": -4.0
          },
          {
            "x_latex": "- \\frac{\\pi}{4}",
            "y_latex": "-1",
            "x": -0.7853981633974483,
            "y": -1.0
          },
          {
            "x_latex": "- \\frac{\\pi}{8}",
            "y_latex": "2",
            "x": -0.39269908169872414,
            "y": 2.0
          }
        ]
      }
    },
    {
      "id": "GF2-30",
      "source_file": "Gonio_fce_opakovani.pdf",
      "section": "2. Tangens/kotangens: perioda a asymptoty",
      "source_label": "C10",
      "prompt_latex": "y=-3\\cot\\left(\\frac x2-\\frac\\pi4\\right)-2",
      "steps": [
        {
          "title": "Rozpoznáme parametry",
          "explanation": "Zadání porovnáme s tvarem y=a cot(b(x−c))+d. Vertikální násobek a ani posun d nemění umístění asymptot.",
          "latex": "a=-3,\\quad b=\\frac{1}{2},\\quad \\varphi=- \\frac{\\pi}{4},\\quad d=-2"
        },
        {
          "title": "Vodorovný posun",
          "explanation": "V závorce upravíme bx+φ=b(x−c), takže c=−φ/b.",
          "latex": "c=-\\frac{- \\frac{\\pi}{4}}{\\frac{1}{2}}=\\frac{\\pi}{2}"
        },
        {
          "title": "Perioda",
          "explanation": "Tangens i kotangens mají původní periodu π. Pro argument bx+φ platí T=π/|b|.",
          "latex": "T=\\frac\\pi{|\\frac{1}{2}|}=2 \\pi"
        },
        {
          "title": "Podmínka a asymptoty",
          "explanation": "Sinus argumentu je nulový v kπ, a kotangens proto není definován. Vyřešíme podmínku pro svislé asymptoty.",
          "latex": "\\frac{1}{2}x+(- \\frac{\\pi}{4})=k\\pi"
        },
        {
          "title": "Výsledná soustava asymptot",
          "explanation": "Izolujeme x a ponecháme k jako libovolné celé číslo. Rozteč sousedních asymptot je právě jedna perioda.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Náčrt na jedné větvi",
          "explanation": "Do argumentu funkce dosadíme tři typické úhly, dopočítáme x i y a křivku vedeme mezi sousedními asymptotami.",
          "latex": "\\begin{array}{c|ccc}x&\\pi&\\frac{3 \\pi}{2}&2 \\pi\\\\\\hline y&-5&-2&1\\end{array}"
        }
      ],
      "answer_latex": "T=2 \\pi,\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "period_latex": "2 \\pi",
        "asymptotes_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z",
        "range_latex": "\\mathbb R",
        "excluded_x_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\quad k\\in\\mathbb Z"
      },
      "visualization": {
        "type": "function_graph",
        "function": "cot",
        "a": -3.0,
        "b": 0.5,
        "phase_radians": -0.7853981633974483,
        "d": -2.0,
        "period": 6.283185307179586,
        "asymptote_anchor": 1.5707963267948966,
        "asymptote_spacing": 6.283185307179586,
        "points": [
          {
            "x_latex": "\\pi",
            "y_latex": "-5",
            "x": 3.141592653589793,
            "y": -5.0
          },
          {
            "x_latex": "\\frac{3 \\pi}{2}",
            "y_latex": "-2",
            "x": 4.71238898038469,
            "y": -2.0
          },
          {
            "x_latex": "2 \\pi",
            "y_latex": "1",
            "x": 6.283185307179586,
            "y": 1.0
          }
        ]
      }
    },
    {
      "id": "GR1-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "a",
      "prompt_latex": "\\sin(105^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "105^\\circ=60^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 60^\\circ=\\frac{\\sqrt{3}}{2},\\ \\cos 60^\\circ=\\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})+(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\sin(105^\\circ)=\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 105,
        "exact_value_latex": "\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "b",
      "prompt_latex": "\\cos(75^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "75^\\circ=45^\\circ+30^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\sin 30^\\circ=\\frac{1}{2},\\ \\cos 30^\\circ=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{2}}{2})(\\frac{\\sqrt{3}}{2})-(\\frac{\\sqrt{2}}{2})(\\frac{1}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\cos(75^\\circ)=- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 75,
        "exact_value_latex": "- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "c",
      "prompt_latex": "\\sin(15^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "15^\\circ=45^\\circ-30^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus rozdílu dvou úhlů.",
          "latex": "\\sin(\\alpha-\\beta)=\\sin\\alpha\\cos\\beta-\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\sin 30^\\circ=\\frac{1}{2},\\ \\cos 30^\\circ=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{2}}{2})(\\frac{\\sqrt{3}}{2})-(\\frac{\\sqrt{2}}{2})(\\frac{1}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\sin(15^\\circ)=- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 15,
        "exact_value_latex": "- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "d",
      "prompt_latex": "\\cos(105^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "105^\\circ=60^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 60^\\circ=\\frac{\\sqrt{3}}{2},\\ \\cos 60^\\circ=\\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})-(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\cos(105^\\circ)=- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 105,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "e",
      "prompt_latex": "\\sin(75^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "75^\\circ=45^\\circ+30^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\sin 30^\\circ=\\frac{1}{2},\\ \\cos 30^\\circ=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{2}}{2})(\\frac{\\sqrt{3}}{2})+(\\frac{\\sqrt{2}}{2})(\\frac{1}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\sin(75^\\circ)=\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 75,
        "exact_value_latex": "\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "f",
      "prompt_latex": "\\cos(15^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "15^\\circ=45^\\circ-30^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus rozdílu dvou úhlů.",
          "latex": "\\cos(\\alpha-\\beta)=\\cos\\alpha\\cos\\beta+\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\sin 30^\\circ=\\frac{1}{2},\\ \\cos 30^\\circ=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{2}}{2})(\\frac{\\sqrt{3}}{2})+(\\frac{\\sqrt{2}}{2})(\\frac{1}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\cos(15^\\circ)=\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 15,
        "exact_value_latex": "\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-g",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "g",
      "prompt_latex": "\\sin(165^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "165^\\circ=120^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 120^\\circ=\\frac{\\sqrt{3}}{2},\\ \\cos 120^\\circ=- \\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})+(- \\frac{1}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\sin(165^\\circ)=- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 165,
        "exact_value_latex": "- \\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR1-h",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "h",
      "prompt_latex": "\\cos(165^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "165^\\circ=120^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 120^\\circ=\\frac{\\sqrt{3}}{2},\\ \\cos 120^\\circ=- \\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(- \\frac{1}{2})(\\frac{\\sqrt{2}}{2})-(\\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\cos(165^\\circ)=- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 165,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-i",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "i",
      "prompt_latex": "\\sin(135^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "135^\\circ=90^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 90^\\circ=1,\\ \\cos 90^\\circ=0,\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(1)(\\frac{\\sqrt{2}}{2})+(0)(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{\\frac{\\sqrt{2}}{2}}"
        }
      ],
      "answer_latex": "\\sin(135^\\circ)=\\frac{\\sqrt{2}}{2}",
      "metadata": {
        "angle_deg": 135,
        "exact_value_latex": "\\frac{\\sqrt{2}}{2}"
      }
    },
    {
      "id": "GR1-j",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "j",
      "prompt_latex": "\\sin(195^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "195^\\circ=150^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 150^\\circ=\\frac{1}{2},\\ \\cos 150^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})+(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\sin(195^\\circ)=- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 195,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-k",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "k",
      "prompt_latex": "\\cos(195^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "195^\\circ=150^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 150^\\circ=\\frac{1}{2},\\ \\cos 150^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})-(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\cos(195^\\circ)=- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 195,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-l",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "l",
      "prompt_latex": "\\sin(255^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "255^\\circ=210^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 210^\\circ=- \\frac{1}{2},\\ \\cos 210^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(- \\frac{1}{2})(\\frac{\\sqrt{2}}{2})+(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\sin(255^\\circ)=- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 255,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} - \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-m",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "m",
      "prompt_latex": "\\cos(255^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "255^\\circ=210^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 210^\\circ=- \\frac{1}{2},\\ \\cos 210^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})-(- \\frac{1}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\cos(255^\\circ)=- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 255,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-n",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "n",
      "prompt_latex": "\\sin(345^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "345^\\circ=300^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro sinus součtu dvou úhlů.",
          "latex": "\\sin(\\alpha+\\beta)=\\sin\\alpha\\cos\\beta+\\cos\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 300^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\cos 300^\\circ=\\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})+(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}}"
        }
      ],
      "answer_latex": "\\sin(345^\\circ)=- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}",
      "metadata": {
        "angle_deg": 345,
        "exact_value_latex": "- \\frac{\\sqrt{6}}{4} + \\frac{\\sqrt{2}}{4}"
      }
    },
    {
      "id": "GR1-o",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "1. Přesné hodnoty",
      "source_label": "o",
      "prompt_latex": "\\cos(345^\\circ)",
      "steps": [
        {
          "title": "Rozložíme úhel",
          "explanation": "Úhel rozdělíme na součet nebo rozdíl známých úhlů, pro které známe přesné hodnoty sinu a kosinu.",
          "latex": "345^\\circ=300^\\circ+45^\\circ"
        },
        {
          "title": "Vybereme součtový vzorec",
          "explanation": "Použijeme vzorec pro kosinus součtu dvou úhlů.",
          "latex": "\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta"
        },
        {
          "title": "Dosadíme hodnoty z jednotkové kružnice",
          "explanation": "Hodnoty sin a cos pro oba zvolené úhly získáme z jednotkové kružnice.",
          "latex": "\\sin 300^\\circ=- \\frac{\\sqrt{3}}{2},\\ \\cos 300^\\circ=\\frac{1}{2},\\ \\sin 45^\\circ=\\frac{\\sqrt{2}}{2},\\ \\cos 45^\\circ=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Provedeme násobení a sečteme členy",
          "explanation": "Výrazy vynásobíme a výsledek upravíme do tvaru s odmocninami.",
          "latex": "(\\frac{1}{2})(\\frac{\\sqrt{2}}{2})-(- \\frac{\\sqrt{3}}{2})(\\frac{\\sqrt{2}}{2})"
        },
        {
          "title": "Přesná hodnota",
          "explanation": "Výsledek je bez zaokrouhlování a bez kalkulačky.",
          "latex": "\\boxed{\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}}"
        }
      ],
      "answer_latex": "\\cos(345^\\circ)=\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}",
      "metadata": {
        "angle_deg": 345,
        "exact_value_latex": "\\frac{\\sqrt{2}}{4} + \\frac{\\sqrt{6}}{4}"
      }
    },
    {
      "id": "GR2-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "a",
      "prompt_latex": "\\sin(x)=\\frac{1}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\sin(u)=\\frac{1}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{6},\\frac{5 \\pi}{6}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(x)=\\frac{1}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "b",
      "prompt_latex": "\\cos(x)=\\frac{\\sqrt{2}}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\cos(u)=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{4},\\frac{7 \\pi}{4}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(x)=\\frac{\\sqrt{2}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "c",
      "prompt_latex": "\\sin(x)=- \\frac{\\sqrt{3}}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\sin(u)=- \\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{4 \\pi}{3},\\frac{5 \\pi}{3}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{4 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(x)=- \\frac{\\sqrt{3}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{4 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{3}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "d",
      "prompt_latex": "\\cos(x)=- \\frac{1}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\cos(u)=- \\frac{1}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{2 \\pi}{3},\\frac{4 \\pi}{3}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(x)=- \\frac{1}{2}"
        }
      ],
      "answer_latex": "x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{2 \\pi}{3}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "e",
      "prompt_latex": "\\sin(x)=\\frac{\\sqrt{2}}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\sin(u)=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{4},\\frac{3 \\pi}{4}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(x)=\\frac{\\sqrt{2}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "f",
      "prompt_latex": "\\cos(x)=- \\frac{\\sqrt{3}}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\cos(u)=- \\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{5 \\pi}{6},\\frac{7 \\pi}{6}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(x)=- \\frac{\\sqrt{3}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "step_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-g",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "g",
      "prompt_latex": "\\sin(x)=-1",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\sin(u)=-1"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{3 \\pi}{2}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(x)=-1"
        }
      ],
      "answer_latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{3 \\pi}{2}",
            "step_latex": "2 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-h",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "h",
      "prompt_latex": "\\cos(x)=0",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\cos(u)=0"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{2},\\frac{3 \\pi}{2}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(x)=0"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "step_latex": "\\pi"
          }
        ]
      }
    },
    {
      "id": "GR2-i",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "2. Základní goniometrické rovnice",
      "source_label": "i",
      "prompt_latex": "\\sin(x)=0",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=x,\\quad \\sin(u)=0"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{0,\\pi\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=k\\,\\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(x)=0"
        }
      ],
      "answer_latex": "x=k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "step_latex": "\\pi"
          }
        ]
      }
    },
    {
      "id": "GR3-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "a",
      "prompt_latex": "\\sin(2x)=\\frac12",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=2x,\\quad \\sin(u)=\\frac{1}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{6},\\frac{5 \\pi}{6}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(2x)=\\frac{1}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{12}",
            "step_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{12}",
            "step_latex": "\\pi"
          }
        ]
      }
    },
    {
      "id": "GR3-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "b",
      "prompt_latex": "\\cos(3x)=-\\frac12",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=3x,\\quad \\cos(u)=- \\frac{1}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{2 \\pi}{3},\\frac{4 \\pi}{3}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(3x)=- \\frac{1}{2}"
        }
      ],
      "answer_latex": "x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{2 \\pi}{9}",
            "step_latex": "\\frac{2 \\pi}{3}"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{9}",
            "step_latex": "\\frac{2 \\pi}{3}"
          }
        ]
      }
    },
    {
      "id": "GR3-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "c",
      "prompt_latex": "\\sin(3x)=\\frac{\\sqrt3}{2}",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=3x,\\quad \\sin(u)=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{3},\\frac{2 \\pi}{3}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(3x)=\\frac{\\sqrt{3}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{9}",
            "step_latex": "\\frac{2 \\pi}{3}"
          },
          {
            "offset_latex": "\\frac{2 \\pi}{9}",
            "step_latex": "\\frac{2 \\pi}{3}"
          }
        ]
      }
    },
    {
      "id": "GR3-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "d",
      "prompt_latex": "\\cos\\left(\\frac x2\\right)=\\frac{\\sqrt2}2",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=\\frac{1}{2}x,\\quad \\cos(u)=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{4},\\frac{7 \\pi}{4}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{2}+k\\,4 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{2}+k\\,4 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(\\frac{1}{2}x)=\\frac{\\sqrt{2}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,4 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{2}+k\\,4 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "step_latex": "4 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{2}",
            "step_latex": "4 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR3-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "e",
      "prompt_latex": "\\sin(4x)=-\\frac12",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=4x,\\quad \\sin(u)=- \\frac{1}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{7 \\pi}{6},\\frac{11 \\pi}{6}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{7 \\pi}{24}+k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=\\frac{11 \\pi}{24}+k\\,\\frac{\\pi}{2},\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(4x)=- \\frac{1}{2}"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{24}+k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=\\frac{11 \\pi}{24}+k\\,\\frac{\\pi}{2},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{24}",
            "step_latex": "\\frac{\\pi}{2}"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{24}",
            "step_latex": "\\frac{\\pi}{2}"
          }
        ]
      }
    },
    {
      "id": "GR3-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "f",
      "prompt_latex": "\\cos(2x)=-\\frac{\\sqrt3}2",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=2x,\\quad \\cos(u)=- \\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{5 \\pi}{6},\\frac{7 \\pi}{6}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{5 \\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(2x)=- \\frac{\\sqrt{3}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{5 \\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{5 \\pi}{12}",
            "step_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{12}",
            "step_latex": "\\pi"
          }
        ]
      }
    },
    {
      "id": "GR3-g",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "g",
      "prompt_latex": "\\sin\\left(\\frac x2\\right)=-\\frac{\\sqrt2}2",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=\\frac{1}{2}x,\\quad \\sin(u)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{5 \\pi}{4},\\frac{7 \\pi}{4}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{5 \\pi}{2}+k\\,4 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{2}+k\\,4 \\pi,\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(\\frac{1}{2}x)=- \\frac{\\sqrt{2}}{2}"
        }
      ],
      "answer_latex": "x=\\frac{5 \\pi}{2}+k\\,4 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{2}+k\\,4 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{5 \\pi}{2}",
            "step_latex": "4 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{2}",
            "step_latex": "4 \\pi"
          }
        ]
      }
    },
    {
      "id": "GR3-h",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "h",
      "prompt_latex": "\\cos(4x)=0",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=4x,\\quad \\cos(u)=0"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou kosinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{\\pi}{2},\\frac{3 \\pi}{2}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{8}+k\\,\\frac{\\pi}{4},\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\cos(4x)=0"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{8}+k\\,\\frac{\\pi}{4},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{8}",
            "step_latex": "\\frac{\\pi}{4}"
          }
        ]
      }
    },
    {
      "id": "GR3-i",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "3. Rovnice s násobným argumentem",
      "source_label": "i",
      "prompt_latex": "\\sin(3x)=-1",
      "steps": [
        {
          "title": "Zavedeme argument",
          "explanation": "Pokud uvnitř funkce stojí násobek x, označíme si celý argument jako u. Na jednotkové kružnici řešíme jednodušší rovnici.",
          "latex": "u=3x,\\quad \\sin(u)=-1"
        },
        {
          "title": "Najdeme všechny úhly jedné otáčky",
          "explanation": "Na jednotkové kružnici hledáme úhly s hodnotou sinus rovnou danému číslu; zohledníme znaménko v jednotlivých kvadrantech.",
          "latex": "u\\in\\left\\{\\frac{3 \\pi}{2}\\right\\}\\quad\\text{v }[0;2\\pi)"
        },
        {
          "title": "Přidáme všechna otočení",
          "explanation": "Každé řešení se opakuje po celé otočce, tedy po 2π. Pokud jsou nulové hodnoty, lze dvě řady sloučit do jedné s periodou π.",
          "latex": "u=\\alpha+2k\\pi,\\quad k\\in\\mathbb Z"
        },
        {
          "title": "Vrátíme se k x",
          "explanation": "Vydělíme každé řešení koeficientem u=b·x. Nesmíme zapomenout vydělit také periodický člen s k.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        },
        {
          "title": "Zkontrolujeme",
          "explanation": "Dosadíme získané úhly do původní rovnice; základní goniometrická funkce má požadovanou hodnotu a další řešení vznikají o celou periodu.",
          "latex": "\\sin(3x)=-1"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "step_latex": "\\frac{2 \\pi}{3}"
          }
        ]
      }
    },
    {
      "id": "GR4-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "a",
      "prompt_latex": "2\\sin^2(x)-\\sin x-1=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\sin(x),\\quad 2 t^{2} - t - 1=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "\\left(t - 1\\right) \\left(2 t + 1\\right)=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=- \\frac{1}{2}\\quad\\lor\\quad t=1"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\lor\\quad \\sin(x)=1"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR4-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "b",
      "prompt_latex": "2\\cos^2(x)-3\\cos x+1=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\cos(x),\\quad 2 t^{2} - 3 t + 1=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "\\left(t - 1\\right) \\left(2 t - 1\\right)=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=\\frac{1}{2}\\quad\\lor\\quad t=1"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\cos(x)=\\frac{1}{2}\\quad\\lor\\quad \\cos(x)=1"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR4-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "c",
      "prompt_latex": "4\\sin^2(x)-1=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\sin(x),\\quad 4 t^{2} - 1=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "4 t^{2} - 1=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=- \\frac{1}{2}\\quad\\lor\\quad t=\\frac{1}{2}"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\lor\\quad \\sin(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR4-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "d",
      "prompt_latex": "2\\cos^2(x)+3\\cos x+1=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\cos(x),\\quad 2 t^{2} + 3 t + 1=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "\\left(t + 1\\right) \\left(2 t + 1\\right)=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=-1\\quad\\lor\\quad t=- \\frac{1}{2}"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\cos(x)=-1\\quad\\lor\\quad \\cos(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\pi+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\pi+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR4-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "e",
      "prompt_latex": "4\\sin^2(2x)-3=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\sin(2x),\\quad 4 t^{2} - 3=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "4 t^{2} - 3=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=- \\frac{\\sqrt{3}}{2}\\quad\\lor\\quad t=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\sin(2x)=- \\frac{\\sqrt{3}}{2}\\quad\\lor\\quad \\sin(2x)=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\frac{2 \\pi}{3}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{2 \\pi}{3}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR4-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "4. Kvadratické goniometrické rovnice",
      "source_label": "f",
      "prompt_latex": "2\\cos^2(3x)-\\cos(3x)-1=0",
      "steps": [
        {
          "title": "Substituce",
          "explanation": "Za goniometrickou funkci dosadíme proměnnou t, takže získáme obyčejnou kvadratickou rovnici.",
          "latex": "t=\\cos(3x),\\quad 2 t^{2} - t - 1=0"
        },
        {
          "title": "Rozklad na součin",
          "explanation": "Kvadratický trojčlen rozložíme na součin, případně určíme diskriminant a kořeny.",
          "latex": "\\left(t - 1\\right) \\left(2 t + 1\\right)=0"
        },
        {
          "title": "Kořeny a kontrola oboru hodnot",
          "explanation": "Každý kořen musí ležet v intervalu [−1;1]. Jiná hodnota nemůže být hodnotou sinu ani kosinu.",
          "latex": "t=- \\frac{1}{2}\\quad\\lor\\quad t=1"
        },
        {
          "title": "Zpětné dosazení",
          "explanation": "Vrátíme se k příslušné funkci a řešíme všechny platné jednoduché goniometrické rovnice.",
          "latex": "\\cos(3x)=- \\frac{1}{2}\\quad\\lor\\quad \\cos(3x)=1"
        },
        {
          "title": "Všechna řešení",
          "explanation": "Pro každou platnou větev najdeme úhly na jednotkové kružnici, přidáme periodu a vydělíme násobkem u x.",
          "latex": "x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "a",
      "prompt_latex": "\\sin^2x+2\\cos x=1",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "\\sin^2x+2\\cos x=1"
        },
        {
          "title": "Převedeme sinus na kosinus",
          "explanation": "Použijeme základní identitu sin²x+cos²x=1.",
          "latex": "\\sin^2x=1-\\cos^2x"
        },
        {
          "title": "Upravíme na součin",
          "explanation": "Sečteme členy a vytkneme cos x.",
          "latex": "1-\\cos^2x+2\\cos x=1\\ \\Rightarrow\\ \\cos x(2-\\cos x)=0"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\cos(x)=0 ;\\quad \\text{vyřazeno: }\\cos(x)=2"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "b",
      "prompt_latex": "\\cos^2x+\\sin x=1",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "\\cos^2x+\\sin x=1"
        },
        {
          "title": "Převedeme kosinus na sinus",
          "explanation": "Použijeme základní identitu sin²x+cos²x=1.",
          "latex": "\\cos^2x=1-\\sin^2x"
        },
        {
          "title": "Upravíme na součin",
          "explanation": "Vytkneme sin x.",
          "latex": "1-\\sin^2x+\\sin x=1\\ \\Rightarrow\\ \\sin x(1-\\sin x)=0"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\sin(x)=1"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "c",
      "prompt_latex": "2\\sin x\\cos x=\\frac12",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "2\\sin x\\cos x=\\frac12"
        },
        {
          "title": "Použijeme vzorec pro dvojnásobný úhel",
          "explanation": "Levá strana je přesně sin(2x).",
          "latex": "\\sin(2x)=2\\sin x\\cos x"
        },
        {
          "title": "Získáme jednoduchou rovnici",
          "explanation": "Teď se řídíme jednotkovou kružnicí.",
          "latex": "\\sin(2x)=\\frac12"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(2x)=\\frac{1}{2}"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{12}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{12}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "d",
      "prompt_latex": "\\cos^2x-\\sin^2x=-\\frac{\\sqrt2}2",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "\\cos^2x-\\sin^2x=-\\frac{\\sqrt2}2"
        },
        {
          "title": "Použijeme vzorec pro dvojnásobný úhel",
          "explanation": "Levá strana je právě cos(2x).",
          "latex": "\\cos(2x)=\\cos^2x-\\sin^2x"
        },
        {
          "title": "Získáme jednoduchou rovnici",
          "explanation": "Teď se řídíme jednotkovou kružnicí.",
          "latex": "\\cos(2x)=-\\frac{\\sqrt2}2"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\cos(2x)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{3 \\pi}{8}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{8}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{3 \\pi}{8}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{8}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "e",
      "prompt_latex": "\\cos(2x)+2\\sin^2x+\\sin x=\\frac32",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "\\cos(2x)+2\\sin^2x+\\sin x=\\frac32"
        },
        {
          "title": "Rozepíšeme dvojnásobný úhel",
          "explanation": "Tento tvar umožňuje eliminovat člen s sin²x.",
          "latex": "\\cos(2x)=1-2\\sin^2x"
        },
        {
          "title": "Zkrátíme kvadratické členy",
          "explanation": "Členy −2 sin²x a +2 sin²x se vyruší.",
          "latex": "1-2\\sin^2x+2\\sin^2x+\\sin x=\\frac32\\ \\Rightarrow\\ \\sin x=\\frac12"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(x)=\\frac{1}{2}"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "f",
      "prompt_latex": "\\cos(2x)-2\\cos^2x+\\sin x=-\\frac12",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "\\cos(2x)-2\\cos^2x+\\sin x=-\\frac12"
        },
        {
          "title": "Rozepíšeme dvojnásobný úhel",
          "explanation": "Tento tvar umožňuje eliminovat člen s cos²x.",
          "latex": "\\cos(2x)=2\\cos^2x-1"
        },
        {
          "title": "Zkrátíme kvadratické členy",
          "explanation": "Členy +2 cos²x a −2 cos²x se vyruší.",
          "latex": "2\\cos^2x-1-2\\cos^2x+\\sin x=-\\frac12\\ \\Rightarrow\\ \\sin x=\\frac12"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(x)=\\frac{1}{2}"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-g",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "g",
      "prompt_latex": "4\\sin x\\cos x=\\sqrt3",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "4\\sin x\\cos x=\\sqrt3"
        },
        {
          "title": "Použijeme vzorec pro dvojnásobný úhel",
          "explanation": "Násobením dvěma dostaneme původní levou stranu.",
          "latex": "2\\sin x\\cos x=\\sin(2x)"
        },
        {
          "title": "Získáme jednoduchou rovnici",
          "explanation": "Obě strany vydělíme dvěma.",
          "latex": "2\\sin(2x)=\\sqrt3\\ \\Rightarrow\\ \\sin(2x)=\\frac{\\sqrt3}2"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(2x)=\\frac{\\sqrt{3}}{2}"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-h",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "h",
      "prompt_latex": "2\\sin^2(3x)+\\sin(3x)-1=0",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "2\\sin^2(3x)+\\sin(3x)-1=0"
        },
        {
          "title": "Substituce",
          "explanation": "Za sin(3x) dosadíme t.",
          "latex": "t=\\sin(3x),\\quad 2t^2+t-1=0"
        },
        {
          "title": "Rozložíme kvadratickou rovnici",
          "explanation": "Oba kořeny splňují podmínku −1≤t≤1.",
          "latex": "(2t-1)(t+1)=0\\ \\Rightarrow\\ t=\\frac12\\ \\lor\\ t=-1"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\sin(3x)=\\frac{1}{2}\\quad\\lor\\quad \\sin(3x)=-1"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{18}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{5 \\pi}{18}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{18}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{5 \\pi}{18}+k\\,\\frac{2 \\pi}{3}\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR5-i",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "5. Rovnice s úpravami a substitucemi",
      "source_label": "i",
      "prompt_latex": "2\\cos^2(2x)-3\\cos(2x)+1=0",
      "steps": [
        {
          "title": "Rozpoznáme typ rovnice",
          "explanation": "Nejprve hledáme vhodnou identitu nebo substituci. Cílem je převést zadání na rovnici s jednou goniometrickou funkcí.",
          "latex": "2\\cos^2(2x)-3\\cos(2x)+1=0"
        },
        {
          "title": "Substituce",
          "explanation": "Za cos(2x) dosadíme t.",
          "latex": "t=\\cos(2x),\\quad 2t^2-3t+1=0"
        },
        {
          "title": "Rozložíme kvadratickou rovnici",
          "explanation": "Oba kořeny splňují podmínku −1≤t≤1.",
          "latex": "(2t-1)(t-1)=0\\ \\Rightarrow\\ t=\\frac12\\ \\lor\\ t=1"
        },
        {
          "title": "Zkontrolujeme platné větve",
          "explanation": "Hodnota sinu i kosinu vždy patří do intervalu [−1;1]; kořeny mimo tento interval musíme vyřadit.",
          "latex": "\\cos(2x)=\\frac{1}{2}\\quad\\lor\\quad \\cos(2x)=1"
        },
        {
          "title": "Vyjádříme všechna x",
          "explanation": "Z jednotkové kružnice najdeme všechny přípustné úhly a připočítáme správnou periodu.",
          "latex": "x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,\\pi\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z"
    },
    {
      "id": "GR6-a",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "a",
      "prompt_latex": "\\sin x>\\frac12",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\sin x=\\frac12"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac\\pi6,\\frac{5\\pi}6"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Sinus je větší než 1/2 mezi průsečíky v horní části jednotkové kružnice.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: nezahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{\\pi}{6}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{6}+k\\,2 \\pi\\right)"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{\\pi}{6}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{6}+k\\,2 \\pi\\right)",
      "metadata": {
        "interval_family": {
          "left": "\\frac{\\pi}{6}",
          "right": "\\frac{5 \\pi}{6}",
          "period": "2 \\pi",
          "left_closed": false,
          "right_closed": false
        }
      }
    },
    {
      "id": "GR6-b",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "b",
      "prompt_latex": "\\cos x\\le\\frac12",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\cos x=\\frac12"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac\\pi3,\\frac{5\\pi}3"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Kosinus je nejvýše 1/2 od prvního hraničního úhlu přes π až k druhému.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: zahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\frac{\\pi}{3}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{3}+k\\,2 \\pi\\right]"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\frac{\\pi}{3}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{3}+k\\,2 \\pi\\right]",
      "metadata": {
        "interval_family": {
          "left": "\\frac{\\pi}{3}",
          "right": "\\frac{5 \\pi}{3}",
          "period": "2 \\pi",
          "left_closed": true,
          "right_closed": true
        }
      }
    },
    {
      "id": "GR6-c",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "c",
      "prompt_latex": "\\sin x\\ge-\\frac{\\sqrt2}2",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\sin x=-\\frac{\\sqrt2}2"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac{5\\pi}4,\\frac{7\\pi}4"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Výhodný souvislý interval přes nulu je od −π/4 do 5π/4; mimo něj je sinus menší.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: zahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left[- \\frac{\\pi}{4}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{4}+k\\,2 \\pi\\right]"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left[- \\frac{\\pi}{4}+k\\,2 \\pi\\ ;\\ \\frac{5 \\pi}{4}+k\\,2 \\pi\\right]",
      "metadata": {
        "interval_family": {
          "left": "- \\frac{\\pi}{4}",
          "right": "\\frac{5 \\pi}{4}",
          "period": "2 \\pi",
          "left_closed": true,
          "right_closed": true
        }
      }
    },
    {
      "id": "GR6-d",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "d",
      "prompt_latex": "\\cos x<-\\frac{\\sqrt3}2",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\cos x=-\\frac{\\sqrt3}2"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac{5\\pi}6,\\frac{7\\pi}6"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Kosinus je pod danou zápornou hodnotou v úzkém oblouku kolem úhlu π.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: nezahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{5 \\pi}{6}+k\\,2 \\pi\\ ;\\ \\frac{7 \\pi}{6}+k\\,2 \\pi\\right)"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{5 \\pi}{6}+k\\,2 \\pi\\ ;\\ \\frac{7 \\pi}{6}+k\\,2 \\pi\\right)",
      "metadata": {
        "interval_family": {
          "left": "\\frac{5 \\pi}{6}",
          "right": "\\frac{7 \\pi}{6}",
          "period": "2 \\pi",
          "left_closed": false,
          "right_closed": false
        }
      }
    },
    {
      "id": "GR6-e",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "e",
      "prompt_latex": "\\sin x\\le0",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\sin x=0"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "0,\\pi"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Sinus je záporný nebo nulový ve spodní polokružnici.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: zahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\pi+k\\,2 \\pi\\ ;\\ 2 \\pi+k\\,2 \\pi\\right]"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\pi+k\\,2 \\pi\\ ;\\ 2 \\pi+k\\,2 \\pi\\right]",
      "metadata": {
        "interval_family": {
          "left": "\\pi",
          "right": "2 \\pi",
          "period": "2 \\pi",
          "left_closed": true,
          "right_closed": true
        }
      }
    },
    {
      "id": "GR6-f",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "f",
      "prompt_latex": "\\cos x>\\frac{\\sqrt2}2",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\cos x=\\frac{\\sqrt2}2"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac\\pi4,\\frac{7\\pi}4"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Kosinus je větší než √2/2 poblíž kladné osy x; přes hranici 0 se přehledně zapíše jediným intervalem.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: nezahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left(- \\frac{\\pi}{4}+k\\,2 \\pi\\ ;\\ \\frac{\\pi}{4}+k\\,2 \\pi\\right)"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left(- \\frac{\\pi}{4}+k\\,2 \\pi\\ ;\\ \\frac{\\pi}{4}+k\\,2 \\pi\\right)",
      "metadata": {
        "interval_family": {
          "left": "- \\frac{\\pi}{4}",
          "right": "\\frac{\\pi}{4}",
          "period": "2 \\pi",
          "left_closed": false,
          "right_closed": false
        }
      }
    },
    {
      "id": "GR6-g",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "g",
      "prompt_latex": "\\sin(2x)>\\frac{\\sqrt3}2",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\sin(2x)=\\frac{\\sqrt3}2"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "2x=\\frac\\pi3,\\frac{2\\pi}3"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "V argumentu u=2x je sinus nad √3/2 mezi π/3 a 2π/3. Dělíme dvěma i periodu.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: nezahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{\\pi}{6}+k\\,\\pi\\ ;\\ \\frac{\\pi}{3}+k\\,\\pi\\right)"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{\\pi}{6}+k\\,\\pi\\ ;\\ \\frac{\\pi}{3}+k\\,\\pi\\right)",
      "metadata": {
        "interval_family": {
          "left": "\\frac{\\pi}{6}",
          "right": "\\frac{\\pi}{3}",
          "period": "\\pi",
          "left_closed": false,
          "right_closed": false
        }
      }
    },
    {
      "id": "GR6-h",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "h",
      "prompt_latex": "\\cos(3x)\\le-\\frac12",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\cos(3x)=-\\frac12"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "3x=\\frac{2\\pi}3,\\frac{4\\pi}3"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "V argumentu u=3x je kosinus ≤−1/2 mezi 2π/3 a 4π/3. Dělíme třemi i periodu.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: zahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\ ;\\ \\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\right]"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left[\\frac{2 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\ ;\\ \\frac{4 \\pi}{9}+k\\,\\frac{2 \\pi}{3}\\right]",
      "metadata": {
        "interval_family": {
          "left": "\\frac{2 \\pi}{9}",
          "right": "\\frac{4 \\pi}{9}",
          "period": "\\frac{2 \\pi}{3}",
          "left_closed": true,
          "right_closed": true
        }
      }
    },
    {
      "id": "GR6-i",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "6. Goniometrické nerovnice",
      "source_label": "i",
      "prompt_latex": "\\sin\\left(\\frac x2\\right)<\\frac12",
      "steps": [
        {
          "title": "Nejprve rovnost",
          "explanation": "Najdeme body, kde se levá strana přesně rovná pravé. Ty oddělují intervaly, které mají různé znaménko nerovnosti.",
          "latex": "\\sin\\left(\\frac x2\\right)=\\frac12"
        },
        {
          "title": "Vypočítáme mezní úhly",
          "explanation": "Na jednotkové kružnici nebo z tabulkových hodnot určíme hraniční úhly.",
          "latex": "\\frac x2=\\frac\\pi6,\\frac{5\\pi}6"
        },
        {
          "title": "Vybereme správný oblouk",
          "explanation": "Sinus je pod 1/2 na oblouku od 5π/6 do 13π/6. Pro x celý interval vynásobíme dvěma.",
          "latex": "\\text{Zkontrolujeme například vnitřní testovací bod.}"
        },
        {
          "title": "Rozhodneme o krajních bodech",
          "explanation": "Ostré nerovnosti > a < krajní body nezahrnují. Nerovnosti ≤ a ≥ je zahrnují.",
          "latex": "\\text{Kraje: nezahrnuté}"
        },
        {
          "title": "Přidáme všechny periody",
          "explanation": "Celou množinu řešení zapíšeme jako sjednocení intervalů posunutých o příslušnou periodu.",
          "latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{5 \\pi}{3}+k\\,4 \\pi\\ ;\\ \\frac{13 \\pi}{3}+k\\,4 \\pi\\right)"
        }
      ],
      "answer_latex": "\\bigcup_{k\\in\\mathbb Z}\\left(\\frac{5 \\pi}{3}+k\\,4 \\pi\\ ;\\ \\frac{13 \\pi}{3}+k\\,4 \\pi\\right)",
      "metadata": {
        "interval_family": {
          "left": "\\frac{5 \\pi}{3}",
          "right": "\\frac{13 \\pi}{3}",
          "period": "4 \\pi",
          "left_closed": false,
          "right_closed": false
        }
      }
    },
    {
      "id": "GR7-01",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "1",
      "prompt_latex": "\\sin x=\\frac12",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x=\\frac12"
        },
        {
          "title": "Vyhledáme tabulkovou hodnotu",
          "explanation": "Základní úhel je π/6; druhý úhel v periodě je 5π/6.",
          "latex": "\\sin\\frac\\pi6=\\frac12"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-02",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "2",
      "prompt_latex": "2\\cos x=\\sqrt2",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos x=\\sqrt2"
        },
        {
          "title": "Vydělíme dvěma",
          "explanation": "Po vydělení dvěma už máme základní rovnici.",
          "latex": "\\cos x=\\frac{\\sqrt2}2"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-03",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "3",
      "prompt_latex": "2\\sin x+1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin x+1=0"
        },
        {
          "title": "Izolujeme sinus",
          "explanation": "Odečteme 1 a vydělíme 2.",
          "latex": "2\\sin x=-1\\ \\Rightarrow\\ \\sin x=-\\frac12"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-04",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "4",
      "prompt_latex": "2\\cos^2x-1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x-1=0"
        },
        {
          "title": "Izolujeme druhou mocninu",
          "explanation": "Přičteme 1 a vydělíme dvěma.",
          "latex": "\\cos^2x=\\frac12"
        },
        {
          "title": "Odmocníme obě znaménka",
          "explanation": "Z rovnice t²=1/2 plynou dvě znaménka.",
          "latex": "\\cos x=\\pm\\frac{\\sqrt2}2"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=\\frac{\\sqrt{2}}{2}\\quad\\lor\\quad \\cos(x)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-05",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "5",
      "prompt_latex": "\\cos^2x-2\\cos x=3",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos^2x-2\\cos x=3"
        },
        {
          "title": "Substituujeme kosinus",
          "explanation": "Získáme kvadratickou rovnici.",
          "latex": "t=\\cos x,\\quad t^2-2t-3=0"
        },
        {
          "title": "Rozložíme výraz",
          "explanation": "Hodnotu 3 vyřadíme, protože |cos x|≤1.",
          "latex": "(t-3)(t+1)=0\\ \\Rightarrow\\ t=3\\ \\lor\\ t=-1"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\cos(x)=-1\\quad\\text{NEMOŽNÉ: }\\cos(x)=3"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\pi",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-06",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "6",
      "prompt_latex": "2\\sin^2x=\\sqrt2\\sin x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin^2x=\\sqrt2\\sin x"
        },
        {
          "title": "Převedeme vše vlevo",
          "explanation": "Odečteme √2 sin x.",
          "latex": "2\\sin^2x-\\sqrt2\\sin x=0"
        },
        {
          "title": "Vytkneme sinus",
          "explanation": "Nulový součin znamená, že alespoň jeden činitel je nulový.",
          "latex": "\\sin x(2\\sin x-\\sqrt2)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\sin(x)=\\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{4}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{4}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-07",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "7",
      "prompt_latex": "\\sin^2x-\\cos^2x+\\sin x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x-\\cos^2x+\\sin x=0"
        },
        {
          "title": "Převedeme vše na sinus",
          "explanation": "Použijeme Pythagorovu identitu.",
          "latex": "\\cos^2x=1-\\sin^2x\\ \\Rightarrow\\ 2\\sin^2x+\\sin x-1=0"
        },
        {
          "title": "Rozložíme kvadratický výraz",
          "explanation": "Dostaneme dvě možné hodnoty sinu.",
          "latex": "(2\\sin x-1)(\\sin x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{1}{2}\\quad\\lor\\quad \\sin(x)=-1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-08",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "8",
      "prompt_latex": "2\\cos^2x-4\\cos x+3=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x-4\\cos x+3=0"
        },
        {
          "title": "Substituujeme",
          "explanation": "Kvadratická rovnice pro t.",
          "latex": "t=\\cos x,\\quad 2t^2-4t+3=0"
        },
        {
          "title": "Spočítáme diskriminant",
          "explanation": "Záporný diskriminant znamená žádné reálné t.",
          "latex": "D=(-4)^2-4\\cdot2\\cdot3=-8<0"
        },
        {
          "title": "Rozhodneme o řešení",
          "explanation": "Vzniklá kvadratická rovnice nemá reálné kořeny nebo žádný kořen nesplňuje obor hodnot sinu/kosinu.",
          "latex": "\\boxed{\\varnothing}"
        }
      ],
      "answer_latex": "\\varnothing",
      "metadata": {
        "solution_families": [],
        "special": "none",
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-09",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "9",
      "prompt_latex": "2+\\cos(2x)=-5\\sin x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2+\\cos(2x)=-5\\sin x"
        },
        {
          "title": "Přepíšeme cos(2x)",
          "explanation": "Vzorec pro dvojnásobný úhel vyjádřený pomocí sin² x.",
          "latex": "\\cos(2x)=1-2\\sin^2x"
        },
        {
          "title": "Získáme kvadratickou rovnici",
          "explanation": "Převedeme všechno na jednu stranu.",
          "latex": "3-2\\sin^2x=-5\\sin x\\ \\Rightarrow\\ 2\\sin^2x-5\\sin x-3=0"
        },
        {
          "title": "Rozklad a kořeny",
          "explanation": "Sinus 3 je nemožný.",
          "latex": "(2\\sin x+1)(\\sin x-3)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\text{NEMOŽNÉ: }\\sin(x)=3"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-10",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "10",
      "prompt_latex": "\\sin^2x-\\sin x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x-\\sin x=0"
        },
        {
          "title": "Vytkneme sinus",
          "explanation": "Každý z obou činitelů může být nula.",
          "latex": "\\sin x(\\sin x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\sin(x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-11",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "11",
      "prompt_latex": "2\\cos^2x=\\sin^2x-1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x=\\sin^2x-1"
        },
        {
          "title": "Převedeme sinus na kosinus",
          "explanation": "Použijeme sin²x+cos²x=1.",
          "latex": "\\sin^2x-1=-\\cos^2x"
        },
        {
          "title": "Zkrátíme rovnici",
          "explanation": "Jediná možnost je cos x=0.",
          "latex": "2\\cos^2x=-\\cos^2x\\ \\Rightarrow\\ 3\\cos^2x=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=0"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-12",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "12",
      "prompt_latex": "4\\sin^4x+12\\cos^2x=7",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "4\\sin^4x+12\\cos^2x=7"
        },
        {
          "title": "Dosadíme za cos²",
          "explanation": "Vše vyjádříme pomocí sinu.",
          "latex": "4\\sin^4x+12(1-\\sin^2x)=7"
        },
        {
          "title": "Substituce t=sin²x",
          "explanation": "Převádíme na kvadratickou rovnici.",
          "latex": "4t^2-12t+5=0,\\quad t\\in[0;1]"
        },
        {
          "title": "Vyřešíme kvadratickou rovnici",
          "explanation": "Druhá hodnota je mimo [0;1].",
          "latex": "(2t-1)(2t-5)=0\\ \\Rightarrow\\ t=\\frac12\\lor t=\\frac52"
        },
        {
          "title": "Vrátíme se k sinu",
          "explanation": "Odmocňujeme obě znaménka.",
          "latex": "\\sin^2x=\\frac12\\ \\Rightarrow\\ \\sin x=\\pm\\frac{\\sqrt2}2"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{\\sqrt{2}}{2}\\quad\\lor\\quad \\sin(x)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-13",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "13",
      "prompt_latex": "2\\sin^2x-\\cos^2x-4\\sin x+2=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin^2x-\\cos^2x-4\\sin x+2=0"
        },
        {
          "title": "Eliminujeme kosinus",
          "explanation": "Použijeme základní identitu.",
          "latex": "\\cos^2x=1-\\sin^2x"
        },
        {
          "title": "Upravíme kvadratický výraz",
          "explanation": "Sečteme podobné členy.",
          "latex": "3\\sin^2x-4\\sin x+1=0"
        },
        {
          "title": "Rozložíme",
          "explanation": "Pro sin x=1/3 nemáme tabulkový úhel; použijeme arcsin.",
          "latex": "(3\\sin x-1)(\\sin x-1)=0\\ \\Rightarrow\\ \\sin x=\\frac13\\ \\lor\\ \\sin x=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\arcsin\\!\\left(\\frac13\\right)+2k\\pi\\ \\lor\\ x=\\pi-\\arcsin\\!\\left(\\frac13\\right)+2k\\pi\\ \\lor\\ x=\\frac\\pi2+2k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\arcsin\\!\\left(\\frac13\\right)+2k\\pi\\ \\lor\\ x=\\pi-\\arcsin\\!\\left(\\frac13\\right)+2k\\pi\\ \\lor\\ x=\\frac\\pi2+2k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\arcsin\\left(\\frac13\\right)",
            "period_latex": "2\\pi"
          },
          {
            "offset_latex": "\\pi-\\arcsin\\left(\\frac13\\right)",
            "period_latex": "2\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-14",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "14",
      "prompt_latex": "\\sin(2x)=\\sin(2x)\\cos(3x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin(2x)=\\sin(2x)\\cos(3x)"
        },
        {
          "title": "Převedeme vše vlevo",
          "explanation": "Vytkneme sin(2x); nedělíme jím, protože by se mohla ztratit řešení.",
          "latex": "\\sin(2x)\\bigl(1-\\cos(3x)\\bigr)=0"
        },
        {
          "title": "Dostaneme dvě rovnice",
          "explanation": "Z nulového součinu plyne, že alespoň jeden činitel je nulový.",
          "latex": "\\sin(2x)=0\\quad\\lor\\quad\\cos(3x)=1"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(2x)=0\\quad\\lor\\quad \\cos(3x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=k\\,\\frac{2 \\pi}{3},\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\frac{\\pi}{2}"
          },
          {
            "offset_latex": "0",
            "period_latex": "\\frac{2 \\pi}{3}"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-15",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "15",
      "prompt_latex": "\\sin^2x+\\sin^2(2x)=1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x+\\sin^2(2x)=1"
        },
        {
          "title": "Rozepíšeme dvojnásobný úhel",
          "explanation": "Použijeme sin(2x)=2sin x cos x.",
          "latex": "\\sin^2(2x)=4\\sin^2x\\cos^2x"
        },
        {
          "title": "Zaměníme 1−sin² za cos²",
          "explanation": "Vytkneme cos² x.",
          "latex": "\\sin^2x+4\\sin^2x\\cos^2x-1=0\\ \\Rightarrow\\ \\cos^2x(4\\sin^2x-1)=0"
        },
        {
          "title": "Rozlišíme kořeny",
          "explanation": "U druhé mocniny nezapomeneme obě znaménka.",
          "latex": "\\cos x=0\\quad\\lor\\quad\\sin x=\\frac12\\quad\\lor\\quad\\sin x=-\\frac12"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=0\\quad\\lor\\quad \\sin(x)=\\frac{1}{2}\\quad\\lor\\quad \\sin(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-16",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "16",
      "prompt_latex": "\\sin x+\\sin(2x)=\\operatorname{tg}x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x+\\sin(2x)=\\operatorname{tg}x"
        },
        {
          "title": "Vyjádříme tangens i sin2x",
          "explanation": "Protože je zde tangens, musí cos x ≠ 0.",
          "latex": "\\sin x+2\\sin x\\cos x=\\frac{\\sin x}{\\cos x}"
        },
        {
          "title": "Vynásobíme nenulovým cos x",
          "explanation": "Násobení je ekvivalentní právě při cos x ≠0.",
          "latex": "\\sin x\\cos x+2\\sin x\\cos^2x=\\sin x"
        },
        {
          "title": "Vytkneme sinus a rozložíme",
          "explanation": "Řešení cos x=−1 už patří do větve sin x=0.",
          "latex": "\\sin x(2\\cos^2x+\\cos x-1)=0\\ \\Rightarrow\\ \\sin x(2\\cos x-1)(\\cos x+1)=0"
        },
        {
          "title": "Definiční podmínky",
          "explanation": "Tuto podmínku stanovíme před násobením jmenovatelů nebo před dělením goniometrickou funkcí. Závěrem ověříme, že žádný kořen není zakázaný.",
          "latex": "\\cos x\\ne0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\cos(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": "\\cos x\\ne0",
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-17",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "17",
      "prompt_latex": "2\\bigl(\\cos(2x)+\\sin^2x\\bigr)=1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\bigl(\\cos(2x)+\\sin^2x\\bigr)=1"
        },
        {
          "title": "Vyjádříme cos(2x)",
          "explanation": "Vzorec pro dvojnásobný úhel.",
          "latex": "\\cos(2x)=\\cos^2x-\\sin^2x"
        },
        {
          "title": "Zkrátíme",
          "explanation": "Zbude jednoduchá druhá mocnina.",
          "latex": "2(\\cos^2x-\\sin^2x+\\sin^2x)=1\\ \\Rightarrow\\ \\cos^2x=\\frac12"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=\\frac{\\sqrt{2}}{2}\\quad\\lor\\quad \\cos(x)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-18",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "18",
      "prompt_latex": "6\\sin^2x-4\\cos x-1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "6\\sin^2x-4\\cos x-1=0"
        },
        {
          "title": "Převedeme na kosinus",
          "explanation": "Všechny výrazy nyní obsahují jen kosinus.",
          "latex": "\\sin^2x=1-\\cos^2x\\ \\Rightarrow\\ 6\\cos^2x+4\\cos x-5=0"
        },
        {
          "title": "Kvadratická rovnice pro t",
          "explanation": "Použijeme kvadratický vzorec.",
          "latex": "t=\\cos x,\\quad t=\\frac{-2\\pm\\sqrt{34}}6"
        },
        {
          "title": "Vyřadíme nemožný kořen",
          "explanation": "Hodnota kosinu musí patřit do [−1;1].",
          "latex": "\\frac{-2-\\sqrt{34}}6<-1,\\quad\\cos x=\\frac{\\sqrt{34}-2}6"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\pm\\arccos\\!\\left(\\frac{\\sqrt{34}-2}{6}\\right)+2k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\pm\\arccos\\!\\left(\\frac{\\sqrt{34}-2}{6}\\right)+2k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\arccos\\left(\\frac{\\sqrt{34}-2}{6}\\right)",
            "period_latex": "2\\pi"
          },
          {
            "offset_latex": "-\\arccos\\left(\\frac{\\sqrt{34}-2}{6}\\right)",
            "period_latex": "2\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-19",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "19",
      "prompt_latex": "\\cos(2x)=\\cos^2(2x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos(2x)=\\cos^2(2x)"
        },
        {
          "title": "Substituce",
          "explanation": "Provedeme jen obyčejnou kvadratickou úpravu.",
          "latex": "t=\\cos(2x),\\quad t=t^2"
        },
        {
          "title": "Vytkneme t",
          "explanation": "Oba kořeny jsou přípustné.",
          "latex": "t(t-1)=0\\ \\Rightarrow\\ t=0\\ \\lor\\ t=1"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(2x)=0\\quad\\lor\\quad \\cos(2x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{4}+k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "\\frac{\\pi}{2}"
          },
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-20",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "20",
      "prompt_latex": "\\sin x+\\sin(2x)=\\operatorname{tg}x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x+\\sin(2x)=\\operatorname{tg}x"
        },
        {
          "title": "Přepíšeme pomocí sin a cos",
          "explanation": "Podmínka cos x ≠ 0.",
          "latex": "\\sin x+2\\sin x\\cos x=\\frac{\\sin x}{\\cos x}"
        },
        {
          "title": "Vynásobíme cos x a vytkneme sinus",
          "explanation": "Součin musí být nulový.",
          "latex": "\\sin x(\\cos x+2\\cos^2x-1)=0"
        },
        {
          "title": "Rozložíme kvadratický činitel",
          "explanation": "Větev cos x=−1 je už obsažena v sin x=0.",
          "latex": "\\sin x(2\\cos x-1)(\\cos x+1)=0"
        },
        {
          "title": "Definiční podmínky",
          "explanation": "Tuto podmínku stanovíme před násobením jmenovatelů nebo před dělením goniometrickou funkcí. Závěrem ověříme, že žádný kořen není zakázaný.",
          "latex": "\\cos x\\ne0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\cos(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": "\\cos x\\ne0",
        "duplicate_of": 16
      }
    },
    {
      "id": "GR7-21",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "21",
      "prompt_latex": "\\cos^2x-5\\sin x+5=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos^2x-5\\sin x+5=0"
        },
        {
          "title": "Eliminujeme kosinus",
          "explanation": "Pythagorova identita.",
          "latex": "\\cos^2x=1-\\sin^2x"
        },
        {
          "title": "Rozložíme kvadratický výraz",
          "explanation": "Kořen sin x=−6 je nemožný.",
          "latex": "\\sin^2x+5\\sin x-6=0\\ \\Rightarrow\\ (\\sin x+6)(\\sin x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\sin(x)=1\\quad\\text{NEMOŽNÉ: }\\sin(x)=-6"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-22",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "22",
      "prompt_latex": "\\cos x-\\sin(2x)\\cos x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos x-\\sin(2x)\\cos x=0"
        },
        {
          "title": "Vytkneme kosinus",
          "explanation": "Nepovolujeme si dělení cos x, abychom nepřišli o řešení.",
          "latex": "\\cos x\\bigl(1-\\sin(2x)\\bigr)=0"
        },
        {
          "title": "Nulový součin",
          "explanation": "Každý činitel řešíme zvlášť.",
          "latex": "\\cos x=0\\ \\lor\\ \\sin(2x)=1"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=0\\quad\\lor\\quad \\sin(2x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{4}+k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{4}+k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-23",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "23",
      "prompt_latex": "4\\sin^2x\\cos^2x+\\cos^2(2x)=1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "4\\sin^2x\\cos^2x+\\cos^2(2x)=1"
        },
        {
          "title": "Poznáme druhou mocninu sin2x",
          "explanation": "Díky vzorci pro dvojnásobný úhel.",
          "latex": "4\\sin^2x\\cos^2x=\\sin^2(2x)"
        },
        {
          "title": "Použijeme základní identitu",
          "explanation": "Rovnost platí pro každé reálné x.",
          "latex": "\\sin^2(2x)+\\cos^2(2x)=1"
        },
        {
          "title": "Identita platná pro každé x",
          "explanation": "Po úpravě zbude základní goniometrická identita, která platí všude. V zadání nejsou jmenovatele, takže nejsou vyloučené hodnoty.",
          "latex": "\\boxed{x\\in\\mathbb R}"
        }
      ],
      "answer_latex": "x\\in\\mathbb R",
      "metadata": {
        "solution_families": [],
        "special": "all",
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-24",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "24",
      "prompt_latex": "\\cos x=\\sin(2x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos x=\\sin(2x)"
        },
        {
          "title": "Rozepíšeme sin2x",
          "explanation": "Použijeme vzorec sin2x=2sinx cosx.",
          "latex": "\\cos x=2\\sin x\\cos x"
        },
        {
          "title": "Vytkneme kosinus",
          "explanation": "Nedělíme cos x, abychom nepřišli o jeho nulové hodnoty.",
          "latex": "\\cos x(1-2\\sin x)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=0\\quad\\lor\\quad \\sin(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,\\pi\\quad\\lor\\quad x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-25",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "25",
      "prompt_latex": "\\sin^2x+\\sin x\\cos x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x+\\sin x\\cos x=0"
        },
        {
          "title": "Vytkneme sinus",
          "explanation": "Nulový součin znamená sin x=0 nebo sin x+cos x=0.",
          "latex": "\\sin x(\\sin x+\\cos x)=0"
        },
        {
          "title": "Vyřešíme druhou větev",
          "explanation": "Pro cos x=0 by tato větev neplatila; při dělení je kosinus nenulový.",
          "latex": "\\sin x=-\\cos x\\ \\Rightarrow\\ \\tan x=-1"
        },
        {
          "title": "Zachováme obě větve",
          "explanation": "Větev vzniklá vytknutím i druhá větev převedená na tangens musí zůstat ve výsledné množině řešení.",
          "latex": "\\sin x=0\\quad\\lor\\quad\\tan x=-1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\pi\\ \\lor\\ x=-\\frac\\pi4+k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\pi\\ \\lor\\ x=-\\frac\\pi4+k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "-\\frac{\\pi}{4}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-26",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "26",
      "prompt_latex": "\\cos(2x)+\\sin x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\cos(2x)+\\sin x=0"
        },
        {
          "title": "Použijeme cos2x",
          "explanation": "Převádíme na jednu funkci.",
          "latex": "\\cos(2x)=1-2\\sin^2x"
        },
        {
          "title": "Rozložíme kvadratický výraz",
          "explanation": "Vyřešíme obě větve.",
          "latex": "1-2\\sin^2x+\\sin x=0\\ \\Rightarrow\\ (2\\sin x+1)(\\sin x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\lor\\quad \\sin(x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-27",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "27",
      "prompt_latex": "2\\cos^2x+3\\sin x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x+3\\sin x=0"
        },
        {
          "title": "Nahradíme cos²",
          "explanation": "Použijeme Pythagorovu identitu.",
          "latex": "2(1-\\sin^2x)+3\\sin x=0"
        },
        {
          "title": "Rozložíme na činitele",
          "explanation": "Hodnota sin x=2 je mimo [−1;1].",
          "latex": "2\\sin^2x-3\\sin x-2=0\\ \\Rightarrow\\ (2\\sin x+1)(\\sin x-2)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\text{NEMOŽNÉ: }\\sin(x)=2"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-28",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "28",
      "prompt_latex": "\\sin x=\\cos(2x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x=\\cos(2x)"
        },
        {
          "title": "Eliminujeme cos2x",
          "explanation": "Použijeme cos2x=1−2sin²x.",
          "latex": "\\sin x=1-2\\sin^2x"
        },
        {
          "title": "Rozložíme kvadratický výraz",
          "explanation": "Dostaneme sinus 1/2 nebo −1.",
          "latex": "2\\sin^2x+\\sin x-1=0\\ \\Rightarrow\\ (2\\sin x-1)(\\sin x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{1}{2}\\quad\\lor\\quad \\sin(x)=-1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-29",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "29",
      "prompt_latex": "2\\bigl(1+\\cos^2x\\bigr)=4\\sin x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\bigl(1+\\cos^2x\\bigr)=4\\sin x"
        },
        {
          "title": "Eliminujeme cos²",
          "explanation": "Vydělíme dvěma a použijeme cos²=1−sin².",
          "latex": "1+\\cos^2x=2\\sin x\\ \\Rightarrow\\ 2-\\sin^2x=2\\sin x"
        },
        {
          "title": "Vyřešíme kvadratickou rovnici",
          "explanation": "Z obou kořenů je v intervalu [−1;1] jen √3−1.",
          "latex": "\\sin^2x+2\\sin x-2=0\\ \\Rightarrow\\ \\sin x=-1\\pm\\sqrt3"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\arcsin\\!\\left(\\sqrt3-1\\right)+2k\\pi\\ \\lor\\ x=\\pi-\\arcsin\\!\\left(\\sqrt3-1\\right)+2k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\arcsin\\!\\left(\\sqrt3-1\\right)+2k\\pi\\ \\lor\\ x=\\pi-\\arcsin\\!\\left(\\sqrt3-1\\right)+2k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\arcsin\\left(\\sqrt3-1\\right)",
            "period_latex": "2\\pi"
          },
          {
            "offset_latex": "\\pi-\\arcsin\\left(\\sqrt3-1\\right)",
            "period_latex": "2\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-30",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "30",
      "prompt_latex": "2\\cos^2x-\\sqrt3\\sin(2x)=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x-\\sqrt3\\sin(2x)=0"
        },
        {
          "title": "Rozepíšeme dvojnásobný úhel",
          "explanation": "Nahradíme sin2x=2sinx cosx.",
          "latex": "2\\cos^2x-2\\sqrt3\\sin x\\cos x=0"
        },
        {
          "title": "Vytkneme 2cos x",
          "explanation": "Dostaneme dvě větve.",
          "latex": "2\\cos x(\\cos x-\\sqrt3\\sin x)=0"
        },
        {
          "title": "Druhou větev převedeme na tangens",
          "explanation": "Při dělení v druhé větvi je cos x nenulový.",
          "latex": "\\cos x=\\sqrt3\\sin x\\ \\Rightarrow\\ \\tan x=\\frac1{\\sqrt3}=\\frac{\\sqrt3}3"
        },
        {
          "title": "Zachováme obě větve",
          "explanation": "Větev vzniklá vytknutím i druhá větev převedená na tangens musí zůstat ve výsledné množině řešení.",
          "latex": "\\cos x=0\\quad\\lor\\quad\\tan x=\\frac{\\sqrt3}{3}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi2+k\\pi\\ \\lor\\ x=\\frac\\pi6+k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi2+k\\pi\\ \\lor\\ x=\\frac\\pi6+k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-31",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "31",
      "prompt_latex": "\\sin x=\\cos x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x=\\cos x"
        },
        {
          "title": "Převedeme na tangens",
          "explanation": "Cos x nemůže být v řešení nulový, protože pak sin x=±1.",
          "latex": "\\frac{\\sin x}{\\cos x}=1\\ \\Rightarrow\\ \\tan x=1"
        },
        {
          "title": "Najdeme úhel",
          "explanation": "Tangens má periodu π.",
          "latex": "\\tan\\frac\\pi4=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi4+k\\pi,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi4+k\\pi,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-32",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "32",
      "prompt_latex": "2\\sin^2x-4\\sin x\\cos x+6\\cos^2x=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin^2x-4\\sin x\\cos x+6\\cos^2x=0"
        },
        {
          "title": "Upravíme na součet nezáporných členů",
          "explanation": "Roznásobením výrazu dostaneme přesně zadání.",
          "latex": "2(\\sin x-\\cos x)^2+4\\cos^2x=0"
        },
        {
          "title": "Obě části musí být nulové",
          "explanation": "To by znamenalo sin x=cos x=0 současně, což odporuje sin²+cos²=1.",
          "latex": "\\sin x-\\cos x=0\\ \\land\\ \\cos x=0"
        },
        {
          "title": "Rozhodneme o řešení",
          "explanation": "Vzniklá kvadratická rovnice nemá reálné kořeny nebo žádný kořen nesplňuje obor hodnot sinu/kosinu.",
          "latex": "\\boxed{\\varnothing}"
        }
      ],
      "answer_latex": "\\varnothing",
      "metadata": {
        "solution_families": [],
        "special": "none",
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-33",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "33",
      "prompt_latex": "\\sin^2x+2\\cos^2x-4\\cos x=6",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x+2\\cos^2x-4\\cos x=6"
        },
        {
          "title": "Převod na kosinus",
          "explanation": "Po substituci už máme kvadratickou rovnici.",
          "latex": "\\sin^2x=1-\\cos^2x\\ \\Rightarrow\\ \\cos^2x-4\\cos x-5=0"
        },
        {
          "title": "Rozklad a filtrování kořenů",
          "explanation": "Hodnota cos x=5 je nemožná.",
          "latex": "(\\cos x-5)(\\cos x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\cos(x)=-1\\quad\\text{NEMOŽNÉ: }\\cos(x)=5"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\pi",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-34",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "34",
      "prompt_latex": "2\\sin^2x+\\cos x=1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin^2x+\\cos x=1"
        },
        {
          "title": "Použijeme cos²",
          "explanation": "Převedeme vše na cos x.",
          "latex": "\\sin^2x=1-\\cos^2x\\ \\Rightarrow\\ 2\\cos^2x-\\cos x-1=0"
        },
        {
          "title": "Rozložíme",
          "explanation": "Oba kořeny jsou v [−1;1].",
          "latex": "(2\\cos x+1)(\\cos x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=- \\frac{1}{2}\\quad\\lor\\quad \\cos(x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{2 \\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "0",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-35",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "35",
      "prompt_latex": "\\sin x+\\cos(2x)-1=\\sin x\\cos(2x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x+\\cos(2x)-1=\\sin x\\cos(2x)"
        },
        {
          "title": "Převedeme vše na jednu stranu",
          "explanation": "Vytvoříme dva společné činitele.",
          "latex": "\\sin x-\\sin x\\cos(2x)+\\cos(2x)-1=0"
        },
        {
          "title": "Rozložíme seskupením",
          "explanation": "Nulový součin dává sin x=1 nebo cos2x=1.",
          "latex": "(\\sin x-1)(1-\\cos(2x))=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=1\\quad\\lor\\quad \\cos(2x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=k\\,\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-36",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "36",
      "prompt_latex": "2\\cos^2x+\\sin x=1",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\cos^2x+\\sin x=1"
        },
        {
          "title": "Převedeme na sinus",
          "explanation": "Použijeme cos²=1−sin².",
          "latex": "2(1-\\sin^2x)+\\sin x=1"
        },
        {
          "title": "Kvadratická úprava",
          "explanation": "Dostaneme sin x=−1/2 nebo 1.",
          "latex": "2\\sin^2x-\\sin x-1=0\\ \\Rightarrow\\ (2\\sin x+1)(\\sin x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\lor\\quad \\sin(x)=1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-37",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "37",
      "prompt_latex": "\\frac{\\cos(2x)}{\\cos^2x}=1-\\frac{2\\sin^2x}{\\sin(2x)}",
      "steps": [
        {
          "title": "Určíme definiční obor",
          "explanation": "Původní jmenovatele musí být nenulové: cos² x ≠ 0 a sin(2x) ≠ 0. Ze sin(2x)=2 sin x cos x tedy plyne sin x ≠ 0 i cos x ≠ 0.",
          "latex": "\\sin x\\ne0,\\quad\\cos x\\ne0\\quad\\Longleftrightarrow\\quad x\\ne k\\frac{\\pi}{2},\\ k\\in\\mathbb Z"
        },
        {
          "title": "Přepíšeme obě strany pomocí tangens",
          "explanation": "Použijeme cos(2x)=cos²x−sin²x a sin(2x)=2 sin x cos x. Zkrácení je přípustné díky stanoveným podmínkám.",
          "latex": "\\frac{\\cos^2x-\\sin^2x}{\\cos^2x}=1-\\frac{2\\sin^2x}{2\\sin x\\cos x}\\quad\\Rightarrow\\quad1-\\tan^2x=1-\\tan x"
        },
        {
          "title": "Rozložíme rovnici",
          "explanation": "Odečteme jedničky a převedeme vše na jednu stranu. Součin je nulový, jestliže je alespoň jeden činitel nulový.",
          "latex": "\\tan^2x-\\tan x=0\\quad\\Rightarrow\\quad\\tan x(\\tan x-1)=0"
        },
        {
          "title": "Zkontrolujeme obě větve",
          "explanation": "Větev tan x = 0 by znamenala sin x = 0, což porušuje původní definiční podmínku. Zůstává pouze tan x = 1.",
          "latex": "\\tan x=0\\ \\text{je vyloučeno};\\qquad\\tan x=1"
        },
        {
          "title": "Všechna periodická řešení a zkouška",
          "explanation": "Tangens je roven jedné pro π/4 a opakuje se po π. V těchto bodech jsou původní jmenovatele nenulové a obě strany původní rovnice se rovnají nule.",
          "latex": "x=\\frac{\\pi}{4}+k\\pi,\\quad k\\in\\mathbb Z;\\qquad L=0=P"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{4}+k\\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "\\pi"
          }
        ],
        "special": null,
        "domain_latex": "\\sin x\\ne0\\quad\\land\\quad\\cos x\\ne0",
        "duplicate_of": null
      },
      "correction_note": "Zadání a řešení opraveno podle původního PDF (strana 3, úloha 37): ve jmenovateli na pravé straně je sin(2x), nikoli sin x."
    },
    {
      "id": "GR7-38",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "38",
      "prompt_latex": "2+\\cos(2x)=-5\\sin x",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2+\\cos(2x)=-5\\sin x"
        },
        {
          "title": "Dosadíme identitu",
          "explanation": "Vzorec pro dvojnásobný úhel.",
          "latex": "\\cos(2x)=1-2\\sin^2x"
        },
        {
          "title": "Rozložíme kvadratickou rovnici",
          "explanation": "Sinus 3 neexistuje.",
          "latex": "2\\sin^2x-5\\sin x-3=0\\ \\Rightarrow\\ (2\\sin x+1)(\\sin x-3)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\sin(x)=- \\frac{1}{2}\\quad\\text{NEMOŽNÉ: }\\sin(x)=3"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{7 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{11 \\pi}{6}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{7 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{11 \\pi}{6}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": 9
      }
    },
    {
      "id": "GR7-39",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "39",
      "prompt_latex": "\\sin^2x+2\\cos^2x-4\\cos x=6",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin^2x+2\\cos^2x-4\\cos x=6"
        },
        {
          "title": "Převedeme na kosinus",
          "explanation": "Pythagorova identita.",
          "latex": "\\sin^2x=1-\\cos^2x"
        },
        {
          "title": "Rozložíme",
          "explanation": "Kosinus 5 neexistuje.",
          "latex": "\\cos^2x-4\\cos x-5=0\\ \\Rightarrow\\ (\\cos x-5)(\\cos x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1]. Neplatné hodnoty vyloučíme.",
          "latex": "\\cos(x)=-1\\quad\\text{NEMOŽNÉ: }\\cos(x)=5"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\pi",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": 33
      }
    },
    {
      "id": "GR7-40",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "40",
      "prompt_latex": "\\sin x=\\cos(2x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x=\\cos(2x)"
        },
        {
          "title": "Zaměníme cos2x za sin²x",
          "explanation": "Vzorec pro dvojnásobný úhel.",
          "latex": "\\cos(2x)=1-2\\sin^2x"
        },
        {
          "title": "Rozložíme",
          "explanation": "Obě hodnoty sinu jsou přípustné.",
          "latex": "2\\sin^2x+\\sin x-1=0\\ \\Rightarrow\\ (2\\sin x-1)(\\sin x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{1}{2}\\quad\\lor\\quad \\sin(x)=-1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{3 \\pi}{2}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{2}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": 28
      }
    },
    {
      "id": "GR7-41",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "41",
      "prompt_latex": "\\sin x+\\sin(2x)=\\sin(3x)",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x+\\sin(2x)=\\sin(3x)"
        },
        {
          "title": "Převedeme pravou stranu",
          "explanation": "Na rozdíl sinů použijeme součtově-rozdílový vzorec.",
          "latex": "\\sin x-\\sin(3x)+\\sin(2x)=0"
        },
        {
          "title": "Upravíme rozdíl sinů",
          "explanation": "Dále sin2x=2sinx cosx.",
          "latex": "\\sin x-\\sin(3x)=-2\\sin x\\cos(2x)"
        },
        {
          "title": "Vytkneme sinus",
          "explanation": "Získáme sin x=0 nebo cos x=cos2x.",
          "latex": "2\\sin x(\\cos x-\\cos(2x))=0"
        },
        {
          "title": "Druhou větev převedeme na cos x",
          "explanation": "Cos x=1 už je obsažen ve větvi sin x=0.",
          "latex": "\\cos x=2\\cos^2x-1\\ \\Rightarrow\\ (2\\cos x+1)(\\cos x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=0\\quad\\lor\\quad \\cos(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\pi"
          },
          {
            "offset_latex": "\\frac{2 \\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-42",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "42",
      "prompt_latex": "\\sin x+\\sin(2x)+\\sin(3x)=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x+\\sin(2x)+\\sin(3x)=0"
        },
        {
          "title": "Sečteme sinusy krajních argumentů",
          "explanation": "Použijeme vzorec sinA+sinB.",
          "latex": "\\sin x+\\sin(3x)=2\\sin(2x)\\cos x"
        },
        {
          "title": "Vytkneme sin2x",
          "explanation": "Vzniknou dvě nezávislé goniometrické rovnice.",
          "latex": "\\sin(2x)(2\\cos x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(2x)=0\\quad\\lor\\quad \\cos(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,\\frac{\\pi}{2}\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "\\frac{\\pi}{2}"
          },
          {
            "offset_latex": "\\frac{2 \\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-43",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "43",
      "prompt_latex": "4\\sin^4x+12\\cos^2x=7",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "4\\sin^4x+12\\cos^2x=7"
        },
        {
          "title": "Převedeme na druhou mocninu sinu",
          "explanation": "Jako u čísla 12.",
          "latex": "4\\sin^4x+12(1-\\sin^2x)=7"
        },
        {
          "title": "Substituujeme t=sin²x",
          "explanation": "t musí být v intervalu [0;1].",
          "latex": "4t^2-12t+5=0\\ \\Rightarrow\\ t=\\frac12\\lor t=\\frac52"
        },
        {
          "title": "Odmocníme přípustný kořen",
          "explanation": "Bereme obě znaménka.",
          "latex": "\\sin x=\\pm\\frac{\\sqrt2}2"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{\\sqrt{2}}{2}\\quad\\lor\\quad \\sin(x)=- \\frac{\\sqrt{2}}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac\\pi4+k\\frac\\pi2,\\quad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{3 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{4}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{7 \\pi}{4}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": 12
      }
    },
    {
      "id": "GR7-44",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "44",
      "prompt_latex": "\\sin x\\cos x+\\sin x+\\cos x+1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "\\sin x\\cos x+\\sin x+\\cos x+1=0"
        },
        {
          "title": "Vytkneme po dvojicích",
          "explanation": "Přidáme společný člen.",
          "latex": "\\sin x(\\cos x+1)+(\\cos x+1)=0"
        },
        {
          "title": "Rozložíme na součin",
          "explanation": "Nulový součin dává dvě jednoduché rovnice.",
          "latex": "(\\sin x+1)(\\cos x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=-1\\quad\\lor\\quad \\cos(x)=-1"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{3 \\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=\\pi+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{3 \\pi}{2}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\pi",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-45",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "45",
      "prompt_latex": "2\\sin x\\cos x-\\sin x-2\\cos x+1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "2\\sin x\\cos x-\\sin x-2\\cos x+1=0"
        },
        {
          "title": "Seskupíme členy",
          "explanation": "Ve dvou členech vzniká stejná závorka.",
          "latex": "\\sin x(2\\cos x-1)-(2\\cos x-1)=0"
        },
        {
          "title": "Vytkneme závorku",
          "explanation": "Získáme sin x=1 nebo cos x=1/2.",
          "latex": "(\\sin x-1)(2\\cos x-1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=1\\quad\\lor\\quad \\cos(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{2}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{2}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-46",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "46",
      "prompt_latex": "4\\sin x\\cos x+2\\sin x-2\\cos x-1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "4\\sin x\\cos x+2\\sin x-2\\cos x-1=0"
        },
        {
          "title": "Seskupíme dvojice",
          "explanation": "Obě skupiny mají závorku 2 cos x+1.",
          "latex": "2\\sin x(2\\cos x+1)-(2\\cos x+1)=0"
        },
        {
          "title": "Rozložíme na součin",
          "explanation": "Dvě nezávislé rovnice: sin x=1/2 nebo cos x=−1/2.",
          "latex": "(2\\sin x-1)(2\\cos x+1)=0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\sin(x)=\\frac{1}{2}\\quad\\lor\\quad \\cos(x)=- \\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=\\frac{\\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{6}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{2 \\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{4 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "\\frac{\\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{6}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{2 \\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{4 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    },
    {
      "id": "GR7-47",
      "source_file": "Opakovani_gonio__ne_rovnice.pdf",
      "section": "7. Náhodné procvičovací rovnice",
      "source_label": "47",
      "prompt_latex": "8\\cos^4x-8\\cos^3x-\\cos x+1=0",
      "steps": [
        {
          "title": "Rozpoznáme metodu",
          "explanation": "Hledáme vhodný základní vzorec, vytknutí nebo substituci. Pracujeme v radiánech a všechna periodická řešení zapisujeme s k∈ℤ.",
          "latex": "8\\cos^4x-8\\cos^3x-\\cos x+1=0"
        },
        {
          "title": "Substituce",
          "explanation": "Získáme polynom čtvrtého stupně.",
          "latex": "t=\\cos x,\\quad 8t^4-8t^3-t+1=0"
        },
        {
          "title": "Rozložíme seskupením",
          "explanation": "První a třetí člen seskupíme s druhým a čtvrtým.",
          "latex": "(t-1)(8t^3-1)=0"
        },
        {
          "title": "Použijeme rozdíl třetích mocnin",
          "explanation": "Protože (2t)^3−1=(2t−1)(4t²+2t+1).",
          "latex": "(t-1)(2t-1)(4t^2+2t+1)=0"
        },
        {
          "title": "Vyloučíme komplexní kořeny",
          "explanation": "Zbývají jen t=1 a t=1/2.",
          "latex": "D_{4t^2+2t+1}=2^2-4\\cdot4\\cdot1=-12<0"
        },
        {
          "title": "Zpětné dosazení a kontrola oboru hodnot",
          "explanation": "Přípustné kořeny převedeme zpět na sin/cos. Každá hodnota musí patřit do intervalu [−1;1].",
          "latex": "\\cos(x)=1\\quad\\lor\\quad \\cos(x)=\\frac{1}{2}"
        },
        {
          "title": "Všechna periodická řešení",
          "explanation": "Najdeme úhly na jednotkové kružnici, přidáme vhodnou periodu a při substituci ji také vydělíme. U obecných hodnot použijeme arkusfunkce.",
          "latex": "x=k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z"
        }
      ],
      "answer_latex": "x=k\\,2 \\pi\\quad\\lor\\quad x=\\frac{\\pi}{3}+k\\,2 \\pi\\quad\\lor\\quad x=\\frac{5 \\pi}{3}+k\\,2 \\pi,\\qquad k\\in\\mathbb Z",
      "metadata": {
        "solution_families": [
          {
            "offset_latex": "0",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{\\pi}{3}",
            "period_latex": "2 \\pi"
          },
          {
            "offset_latex": "\\frac{5 \\pi}{3}",
            "period_latex": "2 \\pi"
          }
        ],
        "special": null,
        "domain_latex": null,
        "duplicate_of": null
      }
    }
  ]
};
