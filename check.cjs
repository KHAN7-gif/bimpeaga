const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements={};const el=id=>elements[id]??={value:'',innerHTML:'',textContent:''};
const ctx={document:{getElementById:el,querySelector:()=>({})},console,assert};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),ctx);
vm.runInContext(`
assert.equal(sports.length,9);
const expectedTotals={Overall:[73,73,83],Swimming:[31,31,31],Badminton:[5,5,5],'E-Sports':[4,4,4],Karate:[5,5,8],Archery:[10,10,14],Athletics:[14,14,14],'Lawn Bowls':[3,3,6],'Sepak Takraw':[1,1,1]};
for(const [name,expected] of Object.entries(expectedTotals)){sport=name;render();assert.equal(total().join(),expected.join(),name+' medal totals');assert.equal(visible.length,9);assert.equal(document.getElementById('download').disabled,false);}
for(let i=0;i<9;i++)for(let j=0;j<3;j++)assert.equal(sports.reduce((v,s)=>v+(data[s]?.[i][j]??0),0),data.Overall[i][j],teams[i][0]+' reconciliation');
sport='Overall';render();assert.equal(sum(total()),229);assert.equal(sum(data.Overall[5]),10);assert.equal(overallStanding(5).rank,6);assert(document.getElementById('rows').innerHTML.includes('labuan-highlight'));
sport='Lawn Bowls';render();assert.equal(visible.find(r=>r.i===1).rank,1);assert.equal(visible.find(r=>r.i===5).rank,1);assert.equal(visible.find(r=>r.i===0).rank,3);
sport='Badminton';render();assert.equal(visible.find(r=>r.i===5).rank,3);
sport='E-Sports';render();assert.equal(visible[0].i,3);assert(!document.getElementById('subtitle').textContent.includes('kategori'));
for(let i=0;i<9;i++){const rows=rankedSports(i);assert.equal(rows.at(-1)[0],'Pencak Silat');const m=rows.filter(([,v])=>v).map(([,v])=>v[i]);for(let j=1;j<m.length;j++)assert(compareMedals(m[j-1],m[j])<=0);}
assert.equal(rankedSports(0)[0][0],'Swimming');assert.equal(rankedSports(5)[0][0],'Lawn Bowls');
sport='Pencak Silat';render();assert.equal(visible.length,0);assert(document.getElementById('rows').innerHTML.includes('Belum ada keputusan'));assert(document.getElementById('download').disabled);
sport='Overall';document.getElementById('search').value='Labuan';render();assert.equal(visible.length,1);assert.equal(visible[0].i,5);assert.equal(visible[0].rank,6);
document.getElementById('detail').showModal=()=>{};document.getElementById('rows').onclick({target:{closest:()=>({dataset:{team:'5'}})}});assert(document.getElementById('detailRank').innerHTML.includes('#6'));assert(document.getElementById('detailSub').textContent.includes('10 total medals'));
assert.equal(teamLabel(0),'MAS A - SABAH A');assert.equal(teamLabel(5),'MAS C - F.T. LABUAN');assert.equal(teamLabel(6),'BRUNEI DARUSSALAM');
`,ctx);
console.log('Passed: 229 medals, all eight sport totals, nine delegation reconciliations, rankings and ties, Labuan details, search and pending Silat.');
