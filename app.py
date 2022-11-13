# Step1
from flask import Flask, request, render_template

from contextlib import redirect_stdout
import io
import ast  # stands for abstract syntax tree

app = Flask(__name__)

# Create a default ‘GET’ route for your flask object that directs you to the html page
@app.route('/', methods=['GET'])
def index():
    # Flask template
    # put index.html in templates folder otherwise it will throw a render_template error
    return render_template('index.html')

# Create ‘POST’ route that uses an evaluate function
@app.route('/evaluate', methods=['POST'])
def evaluate():
    # Step2: Extract the command from the json input
    data = request.json
    code = data['command']
    return {'result': evaluate_code(code)}

# Step 3: Create a function evaluate_code(code) that takes in a string and returns the output
def evaluate_code(code):
    # Step2: Parse the input code
    parsed = ast.parse(code)

    # Context manager for temporarily redirecting sys.stdout to another file or file-like object.
    with redirect_stdout(io.StringIO()) as f:
        try:
            #
            for input in parsed.body:
                if type(input) == ast.Expr:
                    # eval() allows you to evaluate arbitrary Python expressions from a string-based or compiled-code-based input.
                    # diff: eval() only execute or evaluate expressions
                    result = eval(compile(ast.Expression(
                        input.value), "<string>", "eval"), globals())
                    # show appropiate result
                    if result:
                        print(result)
                else:
                    # exec()can execute any piece of Python code.
                    exec(compile(ast.Module(
                        body=[input], type_ignores=[]), "<string>", "exec"), globals())
        # If there is an exception, in the result print the exception with an error message
        except Exception as e:
            print('Error!')
            print(e.__class__.__name__ + ' : ')
            print(e)

    return f.getvalue()


if __name__ == '__main__':
    # set debug to true to see the log and applied changes
    app.run(port=8002, debug=True)
