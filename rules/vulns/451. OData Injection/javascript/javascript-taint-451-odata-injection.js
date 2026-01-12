import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const id = request.nextUrl.searchParams.get("id")
    try {
        // ruleid: javascript-taint-451-odata-injection
        const res = await fetch(`${IDM_URL}/managed/user?_queryFilter=frIndexedString4+eq+"C"+and+frIndexedString6+eq+"${id}"&_fields=frIndexedString6,userName,givenName,sn,frUnindexedString2,mail,accountStatus,frIndexedString9,description,telephoneNumber,frIndexedInteger1,frIndexedString10,frIndexedString3`, {
            method: "GET"
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch(e: any) {
        return new Response(e.response, {
            status: e.status
        })
    }
}

function foo(userInput){
    // ruleid: javascript-taint-451-odata-injection
    const query = `foo+eq+"${userInput}"&foo`
}

function getUsers(req) {
  const filter = req.query.name; // SOURCE

  // ruleid: javascript-taint-451-odata-injection
  const url = `displayName+eq+"${filter}"`;

  return fetch(url);
}

function test(req){
    const user = req.query.user; // SOURCE

    // ruleid: javascript-taint-451-odata-injection
    const query = `userName+eq+"${user}"+and+role+eq+"admin"`;

}


function test(req){
    const age = req.query.age; // SOURCE

    // ruleid: javascript-taint-451-odata-injection
    const filter = `age+eq+${age}`;

    fetch(`/People?$filter=${filter}`);

}

