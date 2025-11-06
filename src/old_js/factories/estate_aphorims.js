"use strict";

angular.module('YieldEstateApp.Factories.EstateAphorims',[])
.factory('EstateAphorims',function (log,EstateTranslateService) {
  var srv = {};

  srv._language = EstateTranslateService.getCurrentLanguage();

  srv._aphorims = [ 
  { "de": [
    { zitat    : 'Lieber eine Stunde über Geld nachdenken, als eine Stunde für Geld arbeiten.',
      author   : 'J. D. Rockefeller'
    },
    { zitat    : 'Geld allein macht nicht glücklich. Es gehören auch noch Immobilien und Grundstücke dazu.',
      author   : 'frei nach Danny Kaye'
    },
    { zitat    : 'Auch aus Steinen, die einem in den Weg gelegt werden, kann man Schönes bauen.',
      author   : 'Johann Wolfgang von Goethe'
    },
    { zitat    : 'Geld verdienen erfordert Klugheit, Geld sparen erfordert Weisheit, Geld ausgeben ist eine Kunst!',
      author   : 'Oscar Wilde'
    },
    { zitat    : 'Zuviel des Guten kann wundervoll sein!',
      author   : 'Mae West'
    },
    { zitat    : 'Das einzige, was man ohne Geld machen kann, sind Schulden.',
      author   : 'Heinz Schenk'
    },
    { zitat    : 'Ohne Leidenschaft hast du keine Energie. Ohne Energie hast du gar nichts.',
      author   : 'Warren Buffett'
    },
    { zitat    : 'Das Geld ist besser als Armut, wenn auch nur aus finanziellen Gründen.',
      author   : 'Woody Allen'
    },
    { zitat    : 'Die Kunst der Hausbesitzer? Angewandte Miethologie!',
      author   : 'Gottlieb Moritz Saphir'
    },
    { zitat    : 'Erst beim Abfassen der Steuererklärung kommt man dahinter, wieviel Geld man sparen würde, wenn man gar keines hätte.',
      author   : 'Fernandel'
    },
    { zitat    : 'Die Phönizier haben das Geld erfunden. Aber warum so wenig?',
      author   : 'Nestroy'
    },
    { zitat    : 'Wenn du den Wert des Geldes kennenlernen willst, versuche, dir welches zu leihen.',
      author   : 'Benjamin Franklin'
    },
    { zitat    : 'Ein Zyniker ist ein Mensch, der von jedem Ding den Preis und von keinem den Wert kennt.',
      author   : 'Oskar Wilde'
    },
    { zitat    : 'Wenn einer sagt, es gehe ihm nicht ums Geld, sondern ums Prinzip, dann geht es ihm bestimmt ums Geld.',
      author   : 'unbekannt'
    },
    { zitat    : 'Mit Geld in der Tasche bist du weise, gut aussehend und du kannst außerdem gut singen.',
      author   : 'Sprichwort'
    },
    { zitat    : "Think big, act small, fail fast; learn rapidly",
      author   : "Sprichwort"
    }
  ], "en": [
    { zitat    : 'Now, one thing I tell everyone is learn about real estate. Repeat after me: real estate provides the highest returns, the greatest values and the least risk.',
      author   : 'Armstrong Williams'
    },
    { zitat    : "Well, real estate is always good, as far as I'm concerned.",
      author   : 'Donald Trump'
    },
    { zitat    : "I want to be a successful landlord. I like real estate.",
      author   : "Two Chainz"
    },
    { zitat    : "Real estate is the key cost of physical retailers. That's why there's the old saw: location, location, location.",
      author   : "Jeff Bezos"
    },
    { zitat    : "The problem with real estate is that it's local. You have to understand the local market.",
      author   : "Robert Kiyosaki"
    },
    { zitat    : "For example, if I make money, I put it in real estate. I always did very well. Location, location, location.",
      author   : "Ivana Trump"
    },
    { zitat    : "I always felt very secure and very safe with real estate. Real estate always appreciates.",
      author   : "Ivana Trump"
    },
    { zitat    : "Many novice real estate investors soon quit the profession and invest in a well-diversified portfolio of bonds. That's because, when you invest in real estate, you often see a side of humanity that stocks, bonds, mutual funds, and saving money shelter you from.",
      author   : "Robert Kiyosaki"
    },
    { zitat    : "A funny thing happens in real estate. When it comes back, it comes back up like gangbusters.",
      author   : "Barbara Corcoran"
    },
    { zitat    : "Real estate is my life. It is my day job, if you will. But it consumes my nights and weekends, too.",
      author   : "Ivanka Trump"
    },
    { zitat    : "What we call real estate - the solid ground to build a house on - is the broad foundation on which nearly all the guilt of this world rests.",
      author   : "Nathaniel Hawthorne"
    },
    { zitat    : "Patriotism is often an arbitrary veneration of real estate above principles.",
      author   : "George Jean Nathan"
    },
    { zitat    : "Certainly the advent of technology and electronic commerce has had an immense impact on the real estate industry.",
      author   : "Michael Oxley"
    },
    { zitat    : "I've always wanted to be the biggest real estate man to come down the pike.",
      author   : "Leona Helmsley"
    },
    { zitat    : "Think big, act small, fail fast; learn rapidly",
      author   : "slogan"
    }

    ]
  
}

  ];


  srv.getAphrims = function() {
    if (srv._language == "de"){
      return angular.copy(srv._aphorims[0].de[Math.floor((Math.random() * (srv._aphorims[0].de.length - 1)) + 1)]);
    } else {
      return angular.copy(srv._aphorims[0].en[Math.floor((Math.random() * (srv._aphorims[0].en.length - 1)) + 1)]);
    }
    return ""; 
  };

  // Public API
  return {
    getAphrims: function() {
      return srv.getAphrims();
    }
  };
});
