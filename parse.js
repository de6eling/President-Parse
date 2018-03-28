/**
 * Created by debeling on 3/24/18.
 */


function parse() {
    speech = $('#parseInput').val();

    speech = speech.split('\n');

    rePresident = new RegExp(/^THE PRESIDENT:/g);
    rePresidentTrump = new RegExp(/^PRESIDENT TRUMP:/g);

    reInterviewer = new RegExp(/^[A-Z]{2,}/);
    reInterviewerQ = new RegExp(/^Q /);

    reParentheses = new RegExp(/\(([^\)]+)\)/g);

    // No one is talking yet
    let presTalking = false;
    let interTalking = false;
    let output = "";

    speech.forEach(function (line) {

        // if (line) {
        //     console.log(reInterviewer.exec(line));
        // }


        if (line) {
            // Is the President talking?
            let pres = rePresident.exec(line);
            let presT = rePresidentTrump.exec(line);

            // Is the interviewer talking
            let interviewer = reInterviewer.test(line);
            let interviewerQ = reInterviewerQ.test(line);

            if (pres || presT) {
                // Take out the name
                line = (pres ? line.replace(rePresident, '<' + pres[0] + '>') : line.replace(rePresidentTrump, '<' + presT[0] + '>'));

                // Is anyone laughing or clapping?
                line = audience(reParentheses, line);

                interTalking = false;
                presTalking = true;

                output += line;

                console.log('PRES: ', line);
            } else if (interviewer || interviewerQ) {
                // take out the line
                line = '<' + line + '>';

                // Is anyone laughing or clapping?
                line = audience(reParentheses, line);

                interTalking = true;
                presTalking= false;

                output += line;

                console.log('INTER: ', line);
            } else if (presTalking) {

                // Is anyone laughing or clapping?
                line = audience(reParentheses, line);

                // console.log('\ninter: ', interviewer);
                // console.log('pres: ', pres);
                // console.log('pres talking: ', presTalking);
                // console.log('inter talking: ', interTalking);

                output += line;

                console.log('P-TALK: ', line);
            } else if (interTalking) {
                // take out the line
                line = '<' + line + '>';

                // Is anyone laughing or clapping?
                line = audience(reParentheses, line);

                output += line;

                console.log('T-TALK: ',line);
            } else {
                // take out the line
                line = '<' + line + '>';

                // Is anyone laughing or clapping?
                line = audience(reParentheses, line);

                output += line;

                console.log('ELSE: ',line);
            }
        } else {
            output += '\n\n';
        }




    });

    $('#parseOutput').text(output);
}

function audience(regex, line) {
    let react = regex.exec(line);
    if (react) {
        return line.replace(regex, '<' + react[0] + '>');
    }
    return line;
}





